import _ from "lodash";

import { IServiceAdapter, PortMessageAdapter, TypedPubSubBus } from "../../Infrastructure";
import { SystemMessageNames, SystemMessageByName, coerceMessageType, AppOverlay, AppControl, SystemMessage } from "../../Shared";

export default abstract class CentralController {
  protected defaultOptions: object = {
    messageHandlerPrefix: "message_",
  };

  protected options?: any;

  constructor(
    private serviceAdapters: IServiceAdapter[],
    private portMessageAdapter: PortMessageAdapter,
    private eventBus: TypedPubSubBus
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
    messageName: SystemMessageNames,
    message: SystemMessage
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
    messageName: SystemMessageNames,
    message: SystemMessage
  ): void {
    console.debug("Service message received by central control", message);

    if (message.source && message.source === "Port") {
      // don't echo port messages back
      return;
    }

    const coerced = coerceMessageType<typeof messageName>(messageName, message);

    if (coerced === undefined) {
      return;
    }

    // if the message handler returns true (or no message handler) publish the message on the bus
    if (this.callMessageHandler(messageName, message)) {
      this.eventBus.publish(messageName, coerced);
      this.portMessageAdapter.sendMessage(messageName, message);
    }
  }

  // @todo move this to the DynamicMethodCall mixin/decorator
  // Also implement in CentralController
  protected callMessageHandler(
    messageName: SystemMessageNames,
    message: SystemMessage
  ): boolean {
    const functName = _.camelCase(
      this.options?.messageHandlerPrefix + messageName
    );
    const funct = this[functName as keyof this];

    if (typeof funct !== "function") {
      return true;
    }

    return funct(message);
  }

  protected sendSystemStatusMessage(): void {
    console.debug("Sending system status");
    this.portMessageAdapter.sendMessage(AppControl.SystemStatus, {
      type: "controlMessage",
      name: AppControl.SystemStatus,
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
    this.portMessageAdapter.setCallback(undefined);
    this.serviceAdapters.forEach((adapter) => adapter.setCallback(undefined));
  }

  protected messageAppControlOverlayOnline(
    message: SystemMessageByName<typeof AppOverlay.OverlayOnline>
  ): boolean {
    this.sendSystemStatusMessage();

    return false;
  }
}
