import { injected } from "brandi";
import OBS_V5_TOKENS from "./ObsV5Tokens";

import type ObsWebsocket from "obs-websocket-js";

import { IObsAdapter } from "../../Interfaces";

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

import type {
  ObsV5EventTransformerSet,
  ObsV5RequestTransformerSet,
} from "./Types";
import { OBSEventTypes } from "obs-websocket-js";
import { SHARED_TOKENS } from "Bindings";

export default class ObsV5Adapter
  extends AbstractServiceAdapter
  implements IObsAdapter
{
  private defaultOptions = {
    websocketPort: 4444,
    websocketPassword: "",
    websocketHost: "127.0.0.1",
  };

  private options: any;

  public get status(): ExternalConnectionStatus {
    return {
      serviceName: "obsV4Websocket",
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

    this.markActive = this.markActive.bind(this);
    this.markInactive = this.markInactive.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    // this.registerEventTransformers(eventTransformers);
    // this.registerRequestTransformers(requestTransformers);
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


    const result = await this.websocket.call(transformer.adapterRequestName, request ?? undefined);

    if (!isResponseTransformer(transformer)) {
      return;
    }

    const response = transformer.buildResponseMessage(result);
    
    this.notifyListener(response.name, response);
  };

  public async connect(): Promise<boolean> {
    try {
      const websocketHost = `ws://${this.options.websocketHost}:${this.options.websocketPort}`;
      await this.websocket.connect(
        websocketHost,
        this.options.websocketPassword,
        { rpcVersion: this.options.rpcVersion }
      );

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

  protected registerTransformers(
    transformerSets: ServiceAdapterTransformerSet
  ): void {
    throw new Error("Method not implemented.");
  }

  protected registerListeners(): void {
    this.websocket.on("ConnectionClosed", this.markInactive);
  }

  protected registerEventTransformers(
    transformers: ObsV5EventTransformerSet
  ): void {
    for (const transformer of transformers) {
      this.websocket.on(transformer.adapterEventName, (...eventData) =>
        this.handleEvent(transformer.adapterEventName, eventData[0])
      );
    }
  }

  protected registerRequestTransformers(
    transformers: ObsV5RequestTransformerSet
  ): void {
    for (const transformer of transformers) {
      this.eventBus.subscribe(transformer.systemRequestName, this.sendMessage);
    }
  }

  protected handleEvent<EventType extends keyof OBSEventTypes>(
    event: EventType,
    eventData: OBSEventTypes[EventType]
  ): void {}

  protected markActive = (): void => {
    this.websocketConnected = true;
  };

  protected markInactive(): void {
    this.websocketConnected = false;
  }
}

injected(
  ObsV5Adapter,
  OBS_V5_TOKENS.obsWebsocket,
  OBS_V5_TOKENS.obsTransformerSet,
  SHARED_TOKENS.frameworkEventBus,
  OBS_V5_TOKENS.obsV5Options.optional
);
