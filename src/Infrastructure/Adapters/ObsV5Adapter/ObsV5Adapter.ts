import type ObsWebsocket from "obs-websocket-js";

import { IObsAdapter } from "@/Infrastructure";

import {
  AbstractServiceAdapter,
  ExternalConnectionStatus,
  ServiceAdapterTransformerSet,
  TypedPubSubBus,
} from "../../Shared";
import {
  isRequestTransformer,
  isResponseTransformer,
  ObsResponse,
  SystemMessage,
  SystemMessageNames,
} from "../../../Shared";

import { OBSEventTypes } from "obs-websocket-js";

export default class ObsV5Adapter
  extends AbstractServiceAdapter
  implements IObsAdapter
{
  private defaultOptions = {
    socketPort: 4444,
    socketPassword: "",
    socketHost: "127.0.0.1",
  };

  private options: any;

  public get status(): ExternalConnectionStatus {
    return {
      serviceName: "obsV5Websocket",
      status: this.websocketConnected ? "connected" : "disconnected",
      details: {},
    };
  }

  private websocketConnected: boolean = false;

  constructor(
    private websocket: ObsWebsocket,
    transformerSet: ServiceAdapterTransformerSet,
    eventBus: TypedPubSubBus,
    options: object = {}
  ) {
    super(transformerSet, eventBus);

    this.options = {...this.defaultOptions, ...options};
    this.registerTransformers(this.transformers);
    this.registerListeners();

    this.options = { ...this.defaultOptions, ...options };
  }

  public sendMessage = async (
    messageName: SystemMessageNames,
    message: SystemMessage
  ): Promise<void> => {
    const transformer = this.selectTransformer("request", messageName);

    if (!isRequestTransformer(transformer)) {
      console.warn(
        "Unable to select transformer for system message",
        messageName,
        message
      );
      return;
    }

    const request = transformer.buildRequestMessage(message);

    const result = await this.websocket.call(
      transformer.adapterRequestName,
      request ?? undefined
    );

    if (!isResponseTransformer(transformer)) {
      return;
    }

    const response = transformer.buildResponseMessage(result);

    this.notifyListener(response.name, response);
  };

  public async connect(): Promise<boolean> {
    debugger;
    console.log("shared worker obs connect");
    try {
      const websocketHost = `ws://${this.options.socketHost}:${this.options.socketPort}`;
      await this.websocket.connect(
        websocketHost,
        this.options.socketPassword,
        {}
      );

      console.log("after auth message");
      this.markActive();
      this.sendMessage(ObsResponse.WebsocketAuthorized, {
        type: "obsResponse",
        name: ObsResponse.WebsocketAuthorized,
      });

      return true;
    } catch (error) {
      console.error("Unable to connect to obs websocket", {
        errorDetails: error,
      });
      return false;
    }
  }



  protected registerListeners(): void {
    this.websocket.on("ConnectionClosed", this.markInactive);
  }

  protected registerEventTransformers(
    transformers: ServiceAdapterTransformerSet
  ): void {
    if (!transformers.event) {
      return;
    }

    for (const transformer of Object.values(transformers.event)) {
      this.websocket.on(transformer.adapterEventName, (...eventData) =>
        this.handleEvent(transformer.adapterEventName, eventData[0])
      );
    }
  }

  protected registerRequestTransformers(
    transformers: ServiceAdapterTransformerSet
  ): void {
    if (!transformers.request) {
      return;
    }

    for (const transformer of Object.values(transformers.request)) {
      this.eventBus.subscribe(transformer.systemRequestName, this.sendMessage);
    }
  }

  protected registerResponseTransformers(transformerSets: ServiceAdapterTransformerSet): void {
    // intentional no-op
  }

  protected handleEvent<EventType extends keyof OBSEventTypes>(
    event: EventType,
    eventData: OBSEventTypes[EventType]
  ): void {}

  protected markActive = (): void => {
    this.websocketConnected = true;
  };

  protected markInactive = (): void => {
    this.websocketConnected = false;
  }
}
