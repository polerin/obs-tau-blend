import { CENTRAL_TOKENS, injected } from "Bindings";
import Websocket from "isomorphic-ws";
import { publish } from "pubsub-js";

import ITauAdapter from "Infrastructure/Adapters/TauAdapter/Interfaces/ITauConnector";

import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";
import { AppMessageSet, SystemMessageCallback, SystemMessageNames } from "Shared/MessageHandling";
import { TauEvents, TauEventNames } from "./Definitions/TauEvents";
import { TauEventTransformer, TauEventTransformerSet } from "./Definitions/Types";
import AbstractServiceAdapter from "Infrastructure/Shared/AbstractServiceAdapter";


// @Todo Refactor along with V4Connector.  Lots of dupes
export default class TauAdapter extends AbstractServiceAdapter<SystemMessageCallback, AppMessageSet, TauEvents, TauEventNames, TauEventTransformer>
    implements ITauAdapter
{

    private defaultOptions = {
        'websocketUri' : 'ws://localhost:8000/ws/twitch-events/',
        'tauSecret' : false,
        'connectTimeout' : 1000
    };

    private options : any;

    // only used during initialization
    private transformerSet : TauEventTransformerSet;

    private tauSocket? : Websocket;

    public constructor(transformers: TauEventTransformerSet, options : any = {}) {
        super();

        this.options = {...this.defaultOptions, ...options};

        this.handleConnectionOpened = this.handleConnectionOpened.bind(this);
        this.handleWebsocketMessage = this.handleWebsocketMessage.bind(this);
        
        this.transformerSet = transformers;
    }

    // Note that the first param of this is bound on constructor!
    public async connect(): Promise<boolean> {
        
        try {
            this.tauSocket = new Websocket(this.options.websocketUri);
        } catch (e) {
            console.error("Unable to connect to tau");
            console.error(e);

            return Promise.resolve(false);
        }

        return new Promise<boolean>(this.handleConnectionOpened);
    }

    public getStatus(): ExternalConnectionStatus {

        return {
            serviceName: "tau",
            status : this.getSocketStatus(),
            details :  {}
        }
    }

    public setCallback(callback: SystemMessageCallback | null): void {
        this.callback = callback;
    }

    public sendMessage<MessageName extends keyof AppMessageSet>(messageName: MessageName, message: AppMessageSet[MessageName]): void {
        throw new Error("Method not implemented.");
    }

    protected registerEventTransformers(transformers : TauEventTransformerSet) : void 
    {
        for (const transformer of transformers) {
            this.transformerRegistery[transformer.adapterEventType] = transformer;
            this.tauSocket?.on(transformer.adapterEventType, this.notifyListener.bind(this, transformer.adapterEventType, transformer));
        }
    }

    protected handleConnectionOpened(resolve : Function, reject : Function) : void
    {
        setTimeout(() => {
            reject(false);
        }, this.options.connectTimeout);

        try {
            this.tauSocket?.addEventListener("message", this.handleWebsocketMessage)
            this.tauSocket?.addEventListener("open", this.buildAuthHandler(resolve));
            this.tauSocket?.addEventListener("error", () => { console.info("connect failed?!?!"); reject(false)});
        } catch (e) {
            console.error("what the heckfart", e);
        }
    }

    protected buildAuthHandler(resolve : Function) : (event: Websocket.Event) => void
    {
        return function(this: TauAdapter, event: Websocket.Event) {
            this.tauSocket?.send({token: this.options.tauSecret});

            resolve(true);
        }.bind(this);
    }

    protected handleWebsocketMessage(event : Websocket.MessageEvent) : void 
    {
        console.log("Tau Event", JSON.stringify(event.data));
        const payload = event.data;
    }

    protected notifyListener<EventType extends TauEventNames>(eventName : EventType, transformer : TauEventTransformer, eventData : TauEvents[EventType]) : void 
    {
        if (this.callback) {
            const message = transformer.buildSystemMessage(eventData);
            this.callback(transformer.systemMessageType, message);
        }
    }

    protected getSocketStatus() : ExternalConnectionStatus["status"]
    {
        if (!this.tauSocket) { 
            return "disconnected";
        }

        switch (this.tauSocket.readyState) {
            case Websocket.CLOSED :
                return "disconnected";
            case Websocket.CLOSING : 
                return "disconnecting";
            case Websocket.CONNECTING :
                return "connecting";
            case Websocket.OPEN :
                return "connected";
        }
    }
}

injected(TauAdapter, CENTRAL_TOKENS.tauEventTransformers, CENTRAL_TOKENS.tauOptions.optional);