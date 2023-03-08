import _ from "lodash";
import { customElement, property, state } from "lit/decorators.js";

import singleFollowTemplate from "#overlay/Components/SubscriptionNotification/SingleFollow.template";
import multiFollowTemplate from "#overlay/Components/SubscriptionNotification/MultiFollow.template";

import { TypedPubSubBus } from "#infra";


import {
  TwitchEvent,
  SystemMessageNames,
  SystemMessage,
} from "#shared";
import AbstractOverlayComponent from "#overlay/Components/AbstractOverlayComponent";
import { IMultiItemQueueAwareComponent, MultiItemQueueController, OverlayComponentType } from "#overlay/Shared/index";

@customElement("subscription-notification")
export default class SubscriptionNotification
  extends AbstractOverlayComponent
  implements IMultiItemQueueAwareComponent<string>
{

  @property({ attribute: "display-duration", type: Number })
  public displayDuration= 8000;

  @property({ type: Number })
  public multiItemThreshold = 5;

  @property({ type: Number })
  public multiItemDisplayCount = 5;

  @property({ type: Number })
  public delay = 5000;

  @property({ type: Array })
  public singleFollowMessages = ["New subscription!", "Thank you for subscribing!"];

  @property({ type: Array })
  public multiFollowMessages = ["New subscribers!"];

  @state()
  protected currentItems: Array<string> = [];

  public canAcceptItem: boolean = true;

  /**
   * This component reacts to events
   */
  public componentType: OverlayComponentType = "event";

  /**
   * Subscription token for the pubsub event we are listening to
   */
  protected subscriptionTokens: PubSubJS.Token[] = [];

  /**
   * This controller handles the queue management, telling the component
   * when and what to display.
   */
  protected queueController : MultiItemQueueController<string>;



  public constructor() {
    super();

    this.queueController = new MultiItemQueueController<string>(this, {
      duration: this.displayDuration,
      delay: this.delay,
      multiItemThreshold: this.multiItemThreshold,
      multiItemDisplayCount: this.multiItemDisplayCount,
    });
  }

  public setCurrentItem(item: string): void {
    this.currentItems = [item];
  }

  public setCurrentItems(items: Array<string>): void {
    this.currentItems = items;
  }

  public clearCurrentItem(): void {
    this.currentItems = [];
  }

  public registerCallbacks(eventBus: TypedPubSubBus): void {
    super.registerCallbacks(eventBus);

    this.registerCallback(TwitchEvent.ChannelSubscribe, this.handleSubscribeEvent);
  }

  public disconnectedCallback(): void {
    this.unregisterCallbacks();

    super.disconnectedCallback();
  }

  protected render() {
    if (this.currentItems.length === 0) {
      return "YUUup?";
    }

    if (this.currentItems.length === 1) {
      return this.displaySingleFollow();
    }

    return this.displayMultiFollow();
  }

  protected handleSubscribeEvent = (
    messageName: SystemMessageNames,
    incomingEvent: SystemMessage
  ): void => {

    if (
      incomingEvent === undefined ||
      incomingEvent.name !== TwitchEvent.ChannelSubscribe
    ) {
      // just being careful
      return;
    }

    this.queueController.addItem(incomingEvent.user.userName);
  }

  protected displaySingleFollow() {
    if (this.currentItems) {
      const message = this.selectMessage(this.singleFollowMessages);

      return singleFollowTemplate(this.currentItems[0], message);
    }

    return "";
  }

  protected displayMultiFollow() {
    if (this.currentItems) {
      const message = this.selectMessage(this.multiFollowMessages);

      return multiFollowTemplate(this.currentItems, message);
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
    "subscription-notification": SubscriptionNotification;
  }
}
