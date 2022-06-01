import { CENTRAL_TOKENS, injected } from "Bindings";
import { publish } from "pubsub-js";

import IObsConnector from "Infrastructure/Interfaces/IObsConnector";
import ObsWebsocket from "obs-websocket-js";

import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";

export default class ObsV4Connector implements IObsConnector
{
    private defaultOptions = {
        'websocketPort' : 4444,
        'websocketPassword' :  ""
    };

    private options : any;

    private websocket : ObsWebsocket;

    private websocketConnected : boolean = false;

    constructor(websocket : ObsWebsocket, options : any = {}) {
        this.websocket = websocket;

        this.bindListeners();

        this.options = {...this.defaultOptions, ...options};
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
        console.log("in handle, current websocket: " + this.websocketConnected);
        publish('obs.websocket.connected');
    }

}

injected(ObsV4Connector, CENTRAL_TOKENS.obsWebsocket, CENTRAL_TOKENS.obsOptions.optional);