import { token, OptionalToken } from "brandi";
import ObsWebsocket from "obs-websocket-js";

import IObsAdapter from "Infrastructure/Interfaces/IObsConnector";

import CentralController from "Infrastructure/Controllers/CentralController";

import { V4EventTransformerSet, V4RequestTransformerSet } from "Infrastructure/Adapters/ObsV4Connector/Definitions/Types";
import ITauAdapter from "Infrastructure/Adapters/TauAdapter/Interfaces/ITauConnector";
import { TauEventTransformerSet } from "Infrastructure/Adapters/TauAdapter/Definitions/Types";
import { IServiceAdapter } from "Infrastructure/Interfaces/IServiceAdapter";


export const CENTRAL_TOKENS = {
    /// Service Adapters
    serviceAdapters: token<IServiceAdapter<unknown, unknown>[]>("serviceAdapters"),
    obsAdapter: token<IObsAdapter>("obsAdapter"),
    obsWebsocket: token<ObsWebsocket>("obsWebsocket"),
    obsV4EventTransformers: token<V4EventTransformerSet>("obsV4EventTransformers"),
    obsV4RequestTransformers: token<V4RequestTransformerSet>("obsV4RequestTransformers"),
    obsOptions: token<any>('obsOptions'),

    tauAdapter: token<ITauAdapter>("tauAdapter"),
    tauEventTransformers: token<TauEventTransformerSet>("tauTransformers"),
    tauOptions: token<object>('tauOptions'),

    /// Controller
    centralController: token<CentralController>("centralController")
};
