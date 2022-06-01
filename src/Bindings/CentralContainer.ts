import { Container } from "brandi";
import { container as parentContainer } from "./Container";
import { CENTRAL_TOKENS } from "./CentralTokens";

import { conf_get } from "Shared/AppConfig";

import CentralController from "Infrastructure/Controllers/CentralController";
import ObsV4Connector from "Infrastructure/Adapters/ObsV4Connector/V4Connector";
import ObsWebsocket from "obs-websocket-js";

export const centralContainer = new Container().extend(parentContainer);

// Service Adapters
centralContainer
    .bind(CENTRAL_TOKENS.obsConnector)
    .toInstance(ObsV4Connector)
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
