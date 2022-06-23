import { Container } from "brandi";

import { container as parentContainer } from "./Container";
import { CENTRAL_TOKENS } from "./CentralTokens";
import { conf_get } from "Shared/AppConfig";

import CentralController from "Infrastructure/Controllers/CentralController";
import { IServiceAdapter } from "Infrastructure/Interfaces/IServiceAdapter";
import { obsV4DependencyModule } from "Infrastructure/Adapters/ObsV4Connector/Bindings/ObsV4DependencyModule";
import { tauDependencyModule } from "Infrastructure/Adapters/TauAdapter/Bindings/TauDependencyModule";

export const centralContainer = new Container().extend(parentContainer);

const obsAdapterVersion : string = conf_get('obs.adapterVersion', "");

// Controller
centralContainer
    .bind(CENTRAL_TOKENS.centralController)
    .toInstance(CentralController)
    .inSingletonScope();


// Service Adapters
centralContainer.use(CENTRAL_TOKENS.tauAdapter).from(tauDependencyModule);

if (obsAdapterVersion === "v4") {
    centralContainer.use(CENTRAL_TOKENS.obsAdapter).from(obsV4DependencyModule);
} else if (obsAdapterVersion === "v5") {
    // @todo v5 adapter
}

centralContainer
    .bind(CENTRAL_TOKENS.serviceAdapters)
    .toInstance(() => {
        const adapters : IServiceAdapter<unknown, unknown>[] = [];

        adapters.push(centralContainer.get(CENTRAL_TOKENS.obsAdapter));
        adapters.push(centralContainer.get(CENTRAL_TOKENS.tauAdapter));

        return adapters;
    })
    .inSingletonScope();
