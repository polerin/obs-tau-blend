import { Container, injected } from "brandi";

import { container as parentContainer } from "./Container";
import { CENTRAL_TOKENS } from "./CentralTokens";
import { conf_get } from "../Shared/Utility/AppConfig";

import { tauDependencyModule, IServiceAdapter, ObsV5DependencyModule, TAU_TOKENS } from "../Infrastructure";

const obsAdapterVersion : string = conf_get('obs.adapterVersion', "");

const centralContainer = new Container();
centralContainer.extend(parentContainer);

// Service Adapters
centralContainer.use(CENTRAL_TOKENS.tauAdapter).from(tauDependencyModule);

if (obsAdapterVersion === "v5") {
    centralContainer.use(CENTRAL_TOKENS.obsAdapter).from(ObsV5DependencyModule);
}

centralContainer
    .bind(CENTRAL_TOKENS.serviceAdapters)
    .toInstance(() => {
        const adapters : IServiceAdapter[] = [];

        adapters.push(centralContainer.get(CENTRAL_TOKENS.obsAdapter));
        adapters.push(centralContainer.get(CENTRAL_TOKENS.tauAdapter));

        return adapters;
    })
    .inSingletonScope();


export {
    centralContainer,
}
