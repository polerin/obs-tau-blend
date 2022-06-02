import { CENTRAL_TOKENS, injected } from "Bindings";
import ObsWebsocket from "obs-websocket-js";

import { publish } from "pubsub-js";

import IObsConnector from "Infrastructure/Interfaces/IObsConnector";
import IV4EventTransformer from "./Interfaces/IV4EventTransformer";

import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";
import { SystemMessageCallback, SystemMessageNames } from "Shared/MessageHandling";

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

    private transformerRegistery : Record<ObsV4EventNames, V4EventTransformer> = {};

    private callback? : SystemMessageCallback<SystemMessageNames> | null;


    constructor(websocket : ObsWebsocket, eventTransformers : V4EventTransformerSet,  options : any = {}) {
        this.websocket = websocket;

        this.bindListeners();
        this.registerEventTransformers(eventTransformers);

        this.options = {...this.defaultOptions, ...options};
    }

    public setCallback(callback : SystemMessageCallback<SystemMessageNames>) {
        this.callback = callback;
    }

    public async connect() : Promise<boolean> {
        this.registerListeners();

        try {
            await this.websocket.connect({"password" : this.options.websocketPassword});
            this.websocketConnected = true;

            return true;

        } catch (error) {

            console.log("Unable to connect to obs websocket", {'errorDetails' : error});
            return false;
        }
    }

    public getStatus(): ExternalConnectionStatus {
        return {
            status : this.websocketConnected ? "connected" : "disconnected",
            details: {}
        };
    }

    protected bindListeners() : void 
    {
        this.handleAuthenticationSuccess.bind(this);
    }

    protected registerListeners() : void 
    {
        this.websocket.on("ConnectionOpened", this.handleAuthenticationSuccess);

    }

    protected handleAuthenticationSuccess() : void
    {
        this.websocketConnected = true;
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
            this.callback(transformer.systemMessageType, transformer.buildSystemMessage(eventData));
        }
    }


}

injected(ObsV4Connector, CENTRAL_TOKENS.obsWebsocket, CENTRAL_TOKENS.obsV4EventTransformers, CENTRAL_TOKENS.obsOptions.optional);