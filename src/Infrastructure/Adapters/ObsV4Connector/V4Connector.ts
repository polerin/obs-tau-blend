import { CENTRAL_TOKENS, injected } from "Bindings";
import ObsWebsocket from "obs-websocket-js";

import IObsConnector from "Infrastructure/Interfaces/IObsConnector";

import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";
import { SystemMessageSet, SystemMessageCallback, SystemMessageNames } from "Shared/MessageHandling";

import { ObsV4EventHandlersData, ObsV4EventNames } from "./Definitions/EventHandlersData";
import { V4EventTransformer, V4EventTransformerSet, V4RequestTransformer, V4RequestTransformerSet } from "./Definitions/Types";
import { ObsV4Requests } from "./Definitions/RequestMethodsArgs";
import { subscribe } from "Infrastructure/Shared/TypedPubsub";

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
    private eventTransformerRegistery : Record<string, V4EventTransformer> = {};
    private requestTransformerRegistery : Record<string, V4RequestTransformer> = {};

    private callback? : SystemMessageCallback | null;


    constructor(
        websocket : ObsWebsocket,
        eventTransformers : V4EventTransformerSet,
        requestTransformers : V4RequestTransformerSet,
        options : object = {})
    {
        this.websocket = websocket;

        this.markActive = this.markActive.bind(this);
        this.markInactive = this.markInactive.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        
        this.registerEventTransformers(eventTransformers);
        this.registerRequestTransformers(requestTransformers);
        this.registerListeners();

        this.options = {...this.defaultOptions, ...options};
    }

    public sendMessage<MessageName extends SystemMessageNames>(messageName: MessageName, message: SystemMessageSet[MessageName]): void
    {
        const transformer = this.requestTransformerRegistery[messageName];

        if (!transformer) {
            console.warn("Unable to select transformer for system message", messageName, message);
            return;
        }

        const request = transformer.buildAdapterMessage(message);

        if (request) {
            this.websocket.send(transformer.adapterRequestType, request);  
        } else {
            this.websocket.send(transformer.adapterRequestType);
        }
        
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
            serviceName: "obsV4Websocket",
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
            this.eventTransformerRegistery[transformer.adapterEventType] = transformer;
            this.websocket.on(transformer.adapterEventType, this.notifyListener.bind(this, transformer.adapterEventType, transformer));
        }
    }

    protected registerRequestTransformers(transformers: V4RequestTransformerSet) : void 
    {
        for (const transformer of transformers) {
            this.requestTransformerRegistery[transformer.systemMessageType] = transformer;
            subscribe(transformer.systemMessageType, this.sendMessage);
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

injected(ObsV4Connector, CENTRAL_TOKENS.obsWebsocket, CENTRAL_TOKENS.obsV4EventTransformers, CENTRAL_TOKENS.obsV4RequestTransformers, CENTRAL_TOKENS.obsOptions.optional);