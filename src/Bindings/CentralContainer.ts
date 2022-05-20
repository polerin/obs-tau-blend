import { Container } from "brandi";
import { container as parentContainer } from "./Container";
import { CENTRAL_TOKENS } from "./CentralTokens";

import ObsConnector from "Infrastructure/Adapters/ObsConnector";
import CentralController from "Infrastructure/Controllers/CentralController";
import { ObsWebsocket } from "Infrastructure/Adapters/ObsWebsocket";
import { conf_get } from "Shared/AppConfig";

export const centralContainer = new Container().extend(parentContainer);

// Service Adapters
centralContainer
    .bind(CENTRAL_TOKENS.obsConnector)
    .toInstance(ObsConnector)
    .inSingletonScope();

centralContainer
    .bind(CENTRAL_TOKENS.obsWebsocket)
    .toInstance(() => new ObsWebsocket())
    .inSingletonScope();

centralContainer
    .bind(CENTRAL_TOKENS.obsOptions)
    .toConstant(conf_get('obsConnection', {}));

// Controller
centralContainer
    .bind(CENTRAL_TOKENS.centralController)
    .toInstance(CentralController)
    .inSingletonScope();
