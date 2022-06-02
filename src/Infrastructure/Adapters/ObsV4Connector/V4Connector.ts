import { CENTRAL_TOKENS, injected } from "Bindings";
import ObsWebsocket from "obs-websocket-js";

import { publish } from "pubsub-js";

import IObsConnector from "Infrastructure/Interfaces/IObsConnector";
import IV4EventTransformer from "./Interfaces/IV4EventTransformer";

import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";
import { AppMessageSet, SystemMessageCallback, SystemMessageNames } from "Shared/MessageHandling";

import { ObsV4EventHandlersData, ObsV4EventNames } from "./Definitions/EventHandlersData";
import { V4EventTransformer, V4EventTransformerSet } from "./Definitions/Types";

export default class ObsV4Connector implements IObsConnector
{
    private defaultOptions = {
        'websocketPort' : 4444,
        'websocketPassword' :  ""
    };

    private options : any;

    private websocket : ObsWebsocket;
    private websocketConnected : boolean = false;

    // @todo fix me, making sure we are constraining
    private transformerRegistery : any = {};

    private callback? : SystemMessageCallback | null;


    constructor(websocket : ObsWebsocket, eventTransformers : V4EventTransformerSet,  options : any = {}) {
        this.websocket = websocket;


        this.markActive = this.markActive.bind(this);
        this.markInactive = this.markInactive.bind(this);

        this.transformerRegistery = {};
        
        this.registerEventTransformers(eventTransformers);
        this.registerListeners();

        this.options = {...this.defaultOptions, ...options};
    }

    public sendMessage<MessageName extends SystemMessageNames>(messageName: MessageName, message: AppMessageSet[MessageName]): void
    {
        throw new Error("Method not implemented.");
    }

    public setCallback(callback : SystemMessageCallback) {
        this.callback = callback;
    }

    public async connect() : Promise<boolean> {

        try {
            await this.websocket.connect({"password" : this.options.websocketPassword});

            return true;

        } catch (error) {

            console.error("Unable to connect to obs websocket", {'errorDetails' : error});
            return false;
        }
    }

    public getStatus(): ExternalConnectionStatus {
        return {
            status : this.websocketConnected ? "connected" : "disconnected",
            details: {}
        };
    }

    protected registerListeners() : void
    {
        this.websocket.on("AuthenticationSuccess", this.markActive);
        this.websocket.on("ConnectionClosed", this.markInactive);
    }

    protected registerEventTransformers(transformers : V4EventTransformerSet) : void 
    {
        for (const transformer of transformers) {
            this.transformerRegistery[transformer.obsEventType] = transformer;
            this.websocket.on(transformer.obsEventType, this.notifyListener.bind(this, transformer.obsEventType, transformer));
        }
    }

    protected notifyListener<EventType extends ObsV4EventNames>(obsEventType : EventType, transformer : V4EventTransformer, eventData : ObsV4EventHandlersData[EventType]) : void 
    {
        if (this.callback) {
            const message = transformer.buildSystemMessage(eventData);
            this.callback(transformer.systemMessageType, message);
        }
    }

    protected markActive() : void
    {
        this.websocketConnected = true;
    }

    protected markInactive() : void
    {
        this.websocketConnected = false;
    }

}

injected(ObsV4Connector, CENTRAL_TOKENS.obsWebsocket, CENTRAL_TOKENS.obsV4EventTransformers, CENTRAL_TOKENS.obsOptions.optional);