import { injected } from "brandi";
import { TAU_TOKENS } from "./Bindings/TauTokens";
import Websocket from "isomorphic-ws";

import ITauAdapter from "Infrastructure/Adapters/TauAdapter/Interfaces/ITauConnector";

import { ExternalConnectionStatus, ServiceAdapterTransformerSet } from "Infrastructure/Shared/Types";
import { FrameworkMessageSet, SystemMessageCallback } from "Shared/MessageHandling";
import { TauEvent, TauEvents, TauEventNames } from "./Definitions/TauEvents";
import { TauEventTransformer, TauEventTransformerSet } from "./Definitions/Types";
import AbstractServiceAdapter from "Infrastructure/Shared/AbstractServiceAdapter";

// @Todo Refactor along with V4Connector.  Lots of dupes
export default class TauAdapter extends AbstractServiceAdapter
    implements ITauAdapter
{
    protected registerTransformers(transformerSets: ServiceAdapterTransformerSet<any>): void {
        throw new Error("Method not implemented.");
    }

    private defaultOptions = {
        'websocketUri' : 'ws://localhost:8000/ws/twitch-events/',
        'tauSecret' : false,
        'connectTimeout' : 1000
    };

    public get status(): ExternalConnectionStatus {

        return {
            serviceName: "tau",
            status : this.getSocketStatus(),
            details :  {}
        }
    }

    private options : any;

    private tauSocket? : Websocket;

    public constructor(transformers: TauEventTransformerSet, options : any = {}) {
        super();

        this.options = {...this.defaultOptions, ...options};

        this.handleConnectionOpened = this.handleConnectionOpened.bind(this);
        this.handleWebsocketMessage = this.handleWebsocketMessage.bind(this);
        
        this.registerTransformers(transformers);
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



    public setCallback(callback: SystemMessageCallback | null): void {
        this.callback = callback;
    }

    public sendMessage<MessageName extends keyof FrameworkMessageSet>(messageName: MessageName, message: FrameworkMessageSet[MessageName]): void {
        throw new Error("Method not implemented.");
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
        try {
            const tauEvent = this.parseSocketMessage(event);
            const eventName : TauEventNames = (tauEvent.event_type as TauEventNames);

            if (!(eventName)) {
                throw {
                    message: "Unsupported message type:",
                    details: { message : event}
                }
            }

            const transformer = this.transformerRegistery[tauEvent.event_type];

            this.notifyListener(eventName, transformer, tauEvent);

        } catch (e) {
            console.warn("Unable to parse Tau message", {error: e, message: event});
        }
    }

    protected parseSocketMessage(event :Websocket.MessageEvent) : TauEvent
    {
        const payload : TauEvent = JSON.parse(event.data as string); 

        return payload;
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

injected(TauAdapter, TAU_TOKENS.tauEventTransformers, TAU_TOKENS.tauOptions.optional);