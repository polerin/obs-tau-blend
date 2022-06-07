import { token, OptionalToken } from "brandi";
import ObsWebsocket from "obs-websocket-js";

import IObsAdapter from "Infrastructure/Interfaces/IObsConnector";

import CentralController from "Infrastructure/Controllers/CentralController";

import { V4EventTransformerSet } from "Infrastructure/Adapters/ObsV4Connector/Definitions/Types";
import ITauAdapter from "Infrastructure/Adapters/TauConnector/Interfaces/ITauConnector";
import { TauEventTransformerSet } from "Infrastructure/Adapters/TauConnector/Definitions/Types";
import { IServiceAdapter } from "Infrastructure/Interfaces/IServiceAdapter";


export const CENTRAL_TOKENS = {
    /// Service Adapters
    serviceAdapters: token<IServiceAdapter<unknown>[]>("serviceAdapters"),
    obsAdapter: token<IObsAdapter>("obsAdapter"),
    obsWebsocket: token<ObsWebsocket>("obsWebsocket"),
    obsV4EventTransformers: token<V4EventTransformerSet>("obsV4Transformers"),
    obsOptions: token<object>('obsOptions'),

    tauAdapter: token<ITauAdapter>("tauAdapter"),
    tauEventTransformers: token<TauEventTransformerSet>("tauTransformers"),
    tauOptions: token<object>('tauOptions'),

    /// Controller
    centralController: token<CentralController>("centralController")
};
