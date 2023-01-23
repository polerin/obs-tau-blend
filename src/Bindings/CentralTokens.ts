import { token } from "brandi";

import IServiceAdapter from "@/Infrastructure/Interfaces/IServiceAdapter";

import IObsAdapter from "@/Infrastructure/Interfaces/IObsAdapter";
import ITauAdapter from "@/Infrastructure/Adapters/TauAdapter/Interfaces/ITauConnector";
import { CentralController } from "@/Infrastructure";

export const CENTRAL_TOKENS = {
    /// Service Adapters
    serviceAdapters: token<IServiceAdapter[]>("serviceAdapters"),
    obsAdapter: token<IObsAdapter>("obsAdapter"),
    tauAdapter: token<ITauAdapter>("tauAdapter"),
    centralController: token<CentralController>("centralController"),
};
