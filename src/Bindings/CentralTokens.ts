import { token } from "brandi";



import type CentralController from "Infrastructure/Controllers/CentralController";
import { IServiceAdapter } from "Infrastructure/Interfaces/IServiceAdapter";

import IObsAdapter from "Infrastructure/Interfaces/IObsConnector";
import ITauAdapter from "Infrastructure/Adapters/TauAdapter/Interfaces/ITauConnector";

export const CENTRAL_TOKENS = {
    /// Service Adapters
    serviceAdapters: token<IServiceAdapter<unknown, unknown>[]>("serviceAdapters"),
    obsAdapter: token<IObsAdapter>("obsAdapter"),
    tauAdapter: token<ITauAdapter>("tauAdapter"),


    /// Controller
    centralController: token<CentralController>("centralController")
};
