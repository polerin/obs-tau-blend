import { token, OptionalToken } from "brandi";

import IObsConnector from "Infrastructure/Interfaces/IObsConnector";
import CentralController from "Infrastructure/Controllers/CentralController";
import ObsWebsocket from "obs-websocket-js";


export const CENTRAL_TOKENS = {
    // Service Adapters
    obsConnector: token<IObsConnector>("obsConnector"),
    obsWebsocket: token<ObsWebsocket>("obsWebsocket"),
    obsOptions: token<any>('obsOptions'),

    // Controller
    centralController: token<CentralController>("centralController")
};
