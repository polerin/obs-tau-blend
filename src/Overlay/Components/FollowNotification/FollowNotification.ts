import _ from "lodash";
import { customElement, property, state } from "lit/decorators.js";

import singleFollowTemplate from "#overlay/Components/FollowNotification/SingleFollow.template";
import multiFollowTemplate from "#overlay/Components/FollowNotification/MultiFollow.template";

import { TypedPubSubBus } from "#infra";


import {
  TwitchEvent,
  SystemMessageNames,
  SystemMessage,
  IOverlayComponent,
} from "#shared";
import { OverlayComponentType } from "#overlay/Shared/Types";
import AbstractOverlayComponent from "#overlay/Components/AbstractOverlayComponent";

@customElement("follow-notification")
export default class FollowNotification extends AbstractOverlayComponent
{

  @property({ attribute: "display-time", type: Number })
  public displayTime: number = 8000;

  @property({ type: Number })
  public multiFollowThreshold: number = 5;

  @property({ type: Number })
  public multiFollowShowCount: number = 5;

  @property({ type: Number })
  public waitForMore = 5000;

  @property({ type: Array })
  public singleFollowMessages = ["New Follower!", "New Friend!", "Oh Hello!"];

  @property({ type: Array })
  public multiFollowMessages = ["New Followers!", "New Friends!", "Oh Hello!"];

  @state()
  protected canDisplay: boolean = false;

  public componentType: OverlayComponentType = "persistant";

  /**
   * Buffer of new followers that are witing to be displayed
   */
  protected newFollowBuffer: string[] = [];

  /**
   * The next follower or set of followers to display
   */
  @state()
  protected nextFollowersToDisplay: string[] = [];

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

  public constructor() {
    super();
    this.handleFollowEvent = this.handleFollowEvent.bind(this);
    this.displayTick = this.displayTick.bind(this);
  }
  
  public registerCallbacks(eventBus: TypedPubSubBus): void {
    super.registerCallbacks(eventBus);

    this.registerCallback(TwitchEvent.ChannelFollow, this.handleFollowEvent);
  }
  
  public render() {
    if (!this.canDisplay || this.nextFollowersToDisplay.length === 0) {
      return "";
    }

    if (this.nextFollowersToDisplay.length === 1) {
      return this.displaySingleFollow();
    }

    return this.displayMultiFollow();
  }

  public disconnectedCallback(): void {
    this.unregisterCallbacks();

    super.disconnectedCallback();
  }


  protected handleFollowEvent(
    messageName: SystemMessageNames,
    incomingEvent: SystemMessage
  ): void {
    if (
      incomingEvent === undefined ||
      incomingEvent.name !== TwitchEvent.ChannelFollow
    ) {
      // just being careful
      return;
    }

    this.newFollowBuffer.push(incomingEvent.user_name);

    this.startDisplayCycle();
  }

  // @todo link this with a display request
  protected async startDisplayCycle(): Promise<void> {
    if (this.displayIntervalToken) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, this.waitForMore));

    this.canDisplay = true;
    this.displayIntervalToken = setInterval(this.displayTick, this.displayTime);
  }

  protected displayTick(): void {
    if (!this.canDisplay || !this.displayIntervalToken) {
      // we aren't allowed to display yet, or the interval loop isn't running (?!)
      return;
    }

    if (this.newFollowBuffer.length >= this.multiFollowThreshold) {
      // prepping the next chunk of followers for multi-follow
      this.nextFollowersToDisplay = _.slice(
        this.newFollowBuffer,
        0,
        this.multiFollowShowCount
      );

      // remove those items from the newFollowBuffer
      this.newFollowBuffer = _.drop(
        this.newFollowBuffer,
        this.nextFollowersToDisplay.length
      );

      return;
    }

    const nextFollow = this.newFollowBuffer.shift();

    if (nextFollow) {
      this.nextFollowersToDisplay = [nextFollow];

      return;
    }

    // Nothing to display, clean up and end loop
    this.nextFollowersToDisplay = [];
    this.canDisplay = false;

    clearInterval(this.displayIntervalToken);
    this.displayIntervalToken = undefined;
  }

  protected displaySingleFollow() {
    if (this.nextFollowersToDisplay) {
      const message = this.selectMessage(this.singleFollowMessages);
      return singleFollowTemplate(this.nextFollowersToDisplay[0], message);
    }

    return "";
  }

  protected displayMultiFollow() {
    if (this.nextFollowersToDisplay) {
      const message = this.selectMessage(this.multiFollowMessages);
      return multiFollowTemplate(this.nextFollowersToDisplay, message);
    }

    return "";
  }

  protected selectMessage(messageSet: string[]): string {
    const selected = _.random(0, messageSet.length - 1, false);

    return messageSet[selected] || "Hi!";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "follow-notification": FollowNotification;
  }
}
