import { token } from "brandi";

import {IServiceAdapter, IObsAdapter, ITauAdapter, CentralController } from "#infra";

export const CENTRAL_TOKENS = {
    /// Service Adapters
    serviceAdapters: token<IServiceAdapter[]>("serviceAdapters"),
    obsAdapter: token<IObsAdapter>("obsAdapter"),
    tauAdapter: token<ITauAdapter>("tauAdapter"),
    centralController: token<CentralController>("centralController"),
};
