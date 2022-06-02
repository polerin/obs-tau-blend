import { token, OptionalToken } from "brandi";
import ObsWebsocket from "obs-websocket-js";

import IObsConnector from "Infrastructure/Interfaces/IObsConnector";

import CentralController from "Infrastructure/Controllers/CentralController";

import { V4EventTransformerSet } from "Infrastructure/Adapters/ObsV4Connector/Definitions/Types";


export const CENTRAL_TOKENS = {
    // Service Adapters
    obsConnector: token<IObsConnector>("obsConnector"),
    obsWebsocket: token<ObsWebsocket>("obsWebsocket"),
    obsV4EventTransformers: token<V4EventTransformerSet>("obsV4Transformers"),
    obsOptions: token<object>('obsOptions'),

    // Controller
    centralController: token<CentralController>("centralController")
};
