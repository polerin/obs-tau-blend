import Websocket from "isomorphic-ws";

import {
  TypedPubSubBus, AbstractServiceAdapter,
  ExternalConnectionStatus,
  ServiceAdapterTransformerSet,
} from "#infra/Shared/index";
import { isEventTransformer, SystemMessageByName, SystemMessageCallback, SystemMessageNames } from "#shared";
import { TauEventNames, TauEvent } from "#adapters/TauAdapter/Definitions/TauEvents";
import ITauAdapter from "#adapters/TauAdapter/Interfaces/ITauConnector";

export default class TauAdapter
  extends AbstractServiceAdapter
  implements ITauAdapter {
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
      console.debug('Attempting to connect to TAU at: ' + uri);
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
    if (!transformers.event || this.tauSocket === undefined) {
      return;
    }

    // @todo Implement pre-websocket connect listeners somehow
    for (const transformer of Object.values(transformers.event)) {
      this.tauSocket.on(transformer.adapterEventName, this.handleWebsocketMessage);
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
      const authHandler = this.buildAuthHandler(resolve, reject)
      console.log("TAU auth handler created", authHandler);

      this.tauSocket?.addEventListener("open", authHandler);
      this.tauSocket?.addEventListener("message", this.handleWebsocketMessage);
      this.tauSocket?.addEventListener("error", (e) => {
        console.info("Tau connection failed", e);

        reject(false);
      });
    } catch (e) {
      console.error("Unable to bind to tau socket", e);
    }
  };

  protected buildAuthHandler = (
    resolve: Function,
    reject: Function
  ): ((event: Websocket.Event) => void) => {
    return (_event: Websocket.Event) => {
      console.log('TAU Auth handler called');

      this.tauSocket?.send(JSON.stringify({ token: this.options.tauSecret }), (e?: Error) => {
        
        if (e) {
          console.error("Unable to connect to TAU", e);

          reject(false);
          return;
        }

        console.log("TAU connected, attaching event listener", e);
        resolve(true);
      });

    };
  };

  protected handleWebsocketMessage(event: Websocket.MessageEvent): void {
    console.debug("received tau message", event);
    try {
      const tauEvent = this.parseSocketMessage(event);
      const eventName: TauEventNames = tauEvent.event_type as TauEventNames;
      console.log(`Received tau message: ${eventName}`, tauEvent);

      if (!eventName) {
        throw {
          message: "Unsupported message type: " + Object.keys(tauEvent).join(', '),
          details: { message: event },
        };
      }

      const transformer = this.selectTransformer("event", tauEvent.event_type);

      if (!isEventTransformer(transformer)) {
        throw new Error(
          "Unable to locate transformer for message: " + eventName
        );
      }
      const message = transformer.buildEventMessage(tauEvent);

      this.notifyListener(message.name, message);
    } catch (e: any) {

      const msg = (e instanceof Error) ? e.message : e;
      console.warn("Unable to parse Tau message: " + msg + " \n " + JSON.stringify(event));
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
