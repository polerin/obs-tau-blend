import Websocket from "isomorphic-ws";

import { TypedPubSubBus } from "../..";
import { isEventTransformer, SystemMessageByName, SystemMessageCallback, SystemMessageNames } from "../../../Shared";
import {
  AbstractServiceAdapter,
  ExternalConnectionStatus,
  ServiceAdapterTransformerSet,
} from "../../Shared";
import { TauEventNames, TauEvent } from "./Definitions/TauEvents";
import ITauAdapter from "./Interfaces/ITauConnector";

export default class TauAdapter
  extends AbstractServiceAdapter
  implements ITauAdapter
{
  private defaultOptions = {
    socketProtocol: "ws://",
    socketPort: "8000",
    socketHost: "localhost",
    socketPath: "/ws/twitch-events/",
    tauSecret: false,
    connectTimeout: 1000,
  };

  public get status(): ExternalConnectionStatus {
    return {
      serviceName: "tau",
      status: this.getSocketStatus(),
      details: {},
    };
  }

  private options: any;

  private tauSocket?: Websocket;

  public constructor(
    transformers: ServiceAdapterTransformerSet,
    eventBus: TypedPubSubBus,
    options: any = {}
  ) {
    super(transformers, eventBus);
    
    this.registerTransformers(this.transformers);
    this.options = { ...this.defaultOptions, ...options };

    this.handleConnectionOpened = this.handleConnectionOpened.bind(this);
    this.handleWebsocketMessage = this.handleWebsocketMessage.bind(this);

    this.registerTransformers(transformers);
  }

  // Note that the first param of this is bound on constructor!
  public async connect(): Promise<boolean> {
    const conf = this.options;
    const uri = conf.socketProtocol + conf.socketHost + ":" + conf.socketPort + conf.socketPath;

    try {
      this.tauSocket = new Websocket(uri);

      return new Promise<boolean>(this.handleConnectionOpened);
    } catch (e) {
      console.error("Unable to connect to tau at URI", uri);
      console.error(e);

      return Promise.resolve(false);
    }
  }

  public setCallback(callback: SystemMessageCallback | undefined): void {
    this.callback = callback;
  }

  public sendMessage(
    messageName: SystemMessageNames,
    message: SystemMessageByName<typeof messageName>
  ): void {
    throw new Error("Method not implemented." + message);
  }

  protected registerEventTransformers(
    transformers: ServiceAdapterTransformerSet
  ): void {
    if (!transformers.event) {
      return;
    }

    // @todo Implement pre-websocket connect listeners somehow
    for (const transformer of Object.values(transformers.event)) {
      // this.websocket.on(transformer.adapterEventName, (...eventData) =>
      //   this.handleEvent(transformer.adapterEventName, eventData[0])
      // );
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

  protected registerResponseTransformers(
    transformerSets: ServiceAdapterTransformerSet
  ): void {
    // intentional no-op
  }

  protected handleConnectionOpened = (
    resolve: Function,
    reject: Function
  ): void => {
    setTimeout(() => {
      reject(false);
    }, this.options.connectTimeout);

    try {
      this.tauSocket?.addEventListener("message", this.handleWebsocketMessage);
      this.tauSocket?.addEventListener("open", this.buildAuthHandler(resolve, reject));
      this.tauSocket?.addEventListener("error", () => {
        console.info("connect failed?!?!");

        reject(false);
      });
    } catch (e) {
      console.error("what the heckfart", e);
    }
  };

  protected buildAuthHandler = (
    resolve: Function,
    reject: Function
  ): ((event: Websocket.Event) => void) => {
    console.log("building auth handler");

    return (_event: Websocket.Event) => {
      console.log('Auth handler called');
      this.tauSocket?.send(JSON.stringify({ token: this.options.tauSecret }), (e?: Error) => {
        if (e) {
          console.error("Unable to connect to TAU", e);

          reject(false);
          return;
        }
        console.log("uhm", e);
        resolve(true);
      });

    };
  };

  protected handleWebsocketMessage(event: Websocket.MessageEvent): void {
    try {
      const tauEvent = this.parseSocketMessage(event);
      const eventName: TauEventNames = tauEvent.event_type as TauEventNames;

      if (!eventName) {
        throw {
          message: "Unsupported message type:",
          details: { message: event },
        };
      }

      const transformer = this.selectTransformer("event", tauEvent.event_type);

      if (!isEventTransformer(transformer)) {
        throw new Error(
          "Unable to locate transformer for message: " + tauEvent.event_type
        );
      }

      const message = transformer.buildEventMessage(tauEvent);

      this.notifyListener(message.name, message);
    } catch (e) {
      console.warn("Unable to parse Tau message", { error: e, message: event });
    }
  }

  protected parseSocketMessage(event: Websocket.MessageEvent): TauEvent {
    const payload: TauEvent = JSON.parse(event.data as string);

    return payload;
  }

  protected getSocketStatus(): ExternalConnectionStatus["status"] {
    if (!this.tauSocket) {
      return "disconnected";
    }

    switch (this.tauSocket.readyState) {
      case Websocket.CLOSED:
        return "disconnected";
      case Websocket.CLOSING:
        return "disconnecting";
      case Websocket.CONNECTING:
        return "connecting";
      case Websocket.OPEN:
        return "connected";
    }
  }
}
