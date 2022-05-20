import { CENTRAL_TOKENS, injected } from "Bindings";

import IObsConnector from "Infrastructure/Interfaces/IObsConnector";
import { ObsWebsocket } from "./ObsWebsocket";



export default class ObsConnector implements IObsConnector
{
    private defaultOptions = {
        'websocketPort' : 4444,
        'websocketPassword' :  ""
    };

    private options : any;

    private websocket : any; 

    constructor(websocket : typeof ObsWebsocket, options : any = {}) {
        this.websocket = websocket;
        this.options = {...this.defaultOptions, ...options};

        console.log("websocket options!", this.options);
    }

    public connect() : boolean {
        return false;
    }


}

injected(ObsConnector, CENTRAL_TOKENS.obsWebsocket.optional, CENTRAL_TOKENS.obsOptions.optional);