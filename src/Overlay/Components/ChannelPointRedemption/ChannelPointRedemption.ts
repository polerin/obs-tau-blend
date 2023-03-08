import { customElement, property, state } from "lit/decorators.js";

import { TypedPubSubBus } from "#infra";


import {
  TwitchEvent,
  SystemMessageNames,
  SystemMessage,
  SystemMessages,
} from "#shared";
import { OverlayComponentType } from "#overlay/Shared/Types";
import AbstractOverlayComponent from "#overlay/Components/AbstractOverlayComponent";
import { html } from "lit";

type RedeemEvent = SystemMessages[typeof TwitchEvent.ChannelRedeem];

@customElement("channel-point-redemption")
export default class ChannelPointRedemption extends AbstractOverlayComponent
{

  @property({ attribute: "display-time", type: Number })
  public displayTime: number = 8000;

  @property({ type: Number })
  public delay = 5000;

  @property()
  public redemptionTitle: string = "SetMePlease";

  @state()
  protected canDisplay: boolean = false;

  public componentType: OverlayComponentType = "event";

  /**
   * Buffer of redemptions that need to be handled
   */
  protected redemptionQueue: RedeemEvent[] = [];

  protected currentRedemption?: RedeemEvent;

  /**
   * Subscription token for the pubsub event we are listening to
   */
  protected subscriptionTokens: PubSubJS.Token[] = [];

  /**
   * Interval token used if we are currently displaying, null otherwise
   *
   * Used for stopping the interval loop when we have an empty buffer
   */
  protected displayIntervalToken?: ReturnType<typeof setInterval> | null;

  public registerCallbacks(eventBus: TypedPubSubBus): void {
    super.registerCallbacks(eventBus);

    this.registerCallback(TwitchEvent.ChannelRedeem, this.handleRedeemEvent);
  }
  
  public render() {
    // return html`<div>this is just a test of the channel point redem system..</div>`;
    if (!this.canDisplay || this.currentRedemption === undefined) {
      return;
    }

    return this.displayRedemption();
  }

  public disconnectedCallback(): void {
    this.unregisterCallbacks();

    super.disconnectedCallback();
  }


  protected handleRedeemEvent = (
    messageName: SystemMessageNames,
    incomingEvent: SystemMessage
  ): void => {

    if (
      incomingEvent === undefined ||
      incomingEvent.name !== TwitchEvent.ChannelRedeem
    ) {
      // just being careful
      return;
    }

    this.redemptionQueue.push(incomingEvent);

    this.startDisplayCycle();
  }

  // @todo link this with a display request
  protected async startDisplayCycle(): Promise<void> {
    if (this.displayIntervalToken) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, this.delay));

    this.canDisplay = true;
    this.displayIntervalToken = setInterval(this.displayTick, this.displayTime);

    // initial display of notification
    this.displayTick();
  }

  protected displayTick = (): void => {
    if (!this.canDisplay || !this.displayIntervalToken) {
      // we aren't allowed to display yet, or the interval loop isn't running (?!)
      return;
    }


    const nextItem = this.redemptionQueue.shift();

    if (nextItem) {
      this.currentRedemption = nextItem;

      return;
    }

    // Nothing to display, clean up and end loop
    this.currentRedemption = undefined;
    this.canDisplay = false;

    clearInterval(this.displayIntervalToken);
    this.displayIntervalToken = undefined;
  }

  protected displayRedemption() {
    if (this.currentRedemption) {
      // @todo look at params to decide what to display!
        return html`<slot
          name="${this.currentRedemption.reward.title}"
          .fromUser=${this.currentRedemption.user}
          .text=${this.currentRedemption.userInput}>
        </slot>`;
      // return html`Redeem detected: ${this.currentRedemption.reward.title}`;
    }

    return "";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "channel-point-redemption": ChannelPointRedemption;
  }
}
