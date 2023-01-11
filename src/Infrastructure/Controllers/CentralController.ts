import _ from "lodash";

import PortMessageAdapter from "Infrastructure/Shared/PortMessageAdapter";
import { FrameworkMessageSet } from "Shared/MessageHandling";
import { AppControlMessages, AppOverlayMessages } from "Shared/MessageHandling";
import IServiceAdapter from "Infrastructure/Interfaces/IServiceAdapter";
import { FrameworkMessageNames } from "Shared";
import { TypedPubSubBus } from "Infrastructure/Shared";

export default abstract class CentralController<
  MessageSet extends FrameworkMessageSet = FrameworkMessageSet,
  MessageName extends keyof MessageSet = FrameworkMessageNames
> {
  protected defaultOptions: object = {
    messageHandlerPrefix: "message_",
  };

  protected options?: any;

  constructor(
    private serviceAdapters: IServiceAdapter<any, any>[],
    private portMessageAdapter: PortMessageAdapter<MessageSet>,
    private eventBus: TypedPubSubBus<MessageSet>
  ) {
    // @todo convert to arrow functions
    this.portMessageHandler = this.portMessageHandler.bind(this);
    this.adapterMessageHandler = this.adapterMessageHandler.bind(this);
    this.onSharedWorkerConnect = this.onSharedWorkerConnect.bind(this);
  }

  public async init(options: object): Promise<void> {
    this.options = { ...this.defaultOptions, ...options };

    this.registerListeners();

    await this.connectAdapters();

    this.sendSystemStatusMessage();
  }

  public connectAdapters(): Promise<boolean[]> {
    const connectionPromises: Array<Promise<boolean>> =
      this.serviceAdapters.map((adapter) => adapter.connect());

    return Promise.all(connectionPromises);
  }

  public onSharedWorkerConnect(message: MessageEvent<any>): void {
    console.debug("Central controller port activated");
    this.portMessageAdapter.setPort(message.ports[0]);
    this.portMessageAdapter.connect();
  }

  protected portMessageHandler(
    messageName: MessageName,
    message: MessageSet[typeof messageName]
  ): void {
    console.debug("Port message received by central control", {
      messageName: messageName,
      message: message,
    });

    message.source = "Port";

    // if the message handler returns true (or no message handler) publish the message on the bus
    if (this.callMessageHandler(messageName, message)) {
      console.log("Publishing port message", messageName, message);
      this.eventBus.publish(messageName, message);
    }
  }

  protected adapterMessageHandler(
    messageName: MessageName,
    message: MessageSet[MessageName]
  ): void {
    console.debug("Service message received by central control", message);

    if (message.source && message.source === "Port") {
      // don't echo port messages back
      return;
    }

    // if the message handler returns true (or no message handler) publish the message on the bus
    if (this.callMessageHandler(messageName, message)) {
      this.eventBus.publish(messageName, message);
      this.portMessageAdapter.sendMessage(messageName, message);
    }
  }

  // @todo move this to the DynamicMethodCall mixin/decorator
  // Also do this in the OverlayController
  protected callMessageHandler(
    messageName: MessageName,
    message: MessageSet[typeof messageName]
  ): boolean {
    const functName = _.camelCase(
      this.options?.messageHandlerPrefix + <string>messageName
    );

    // @todo This is annoying, what is the right way to do this dynamic call in TS?
    // @ts-ignore
    return typeof this[functName] == "function"
      ? this[functName](message)
      : true;
  }

  protected sendSystemStatusMessage(): void {
    console.debug("Sending system status");
    this.portMessageAdapter.sendMessage(AppControlMessages.SystemStatus, {
      type: "controlMessage",
      name: AppControlMessages.SystemStatus,
      serviceStatuses: this.serviceAdapters.map((adapter) => adapter.status),
    });
  }

  protected registerListeners() {
    this.portMessageAdapter.setCallback(this.portMessageHandler);

    for (const adapter of this.serviceAdapters) {
      adapter.setCallback(this.adapterMessageHandler);
    }
  }

  protected removeListeners() {
    this.portMessageAdapter.setCallback(null);
    this.serviceAdapters.forEach((adapter) => adapter.setCallback(null));
  }

  protected messageAppControlOverlayOnline(
    message: FrameworkMessageSet[typeof AppOverlayMessages.OverlayOnline]
  ): boolean {
    this.sendSystemStatusMessage();

    return false;
  }
}
