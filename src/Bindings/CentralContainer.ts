import { Container } from "brandi";
import ObsWebsocket from "obs-websocket-js";

import { container as parentContainer } from "./Container";
import { CENTRAL_TOKENS } from "./CentralTokens";
import { conf_get } from "Shared/AppConfig";


import CentralController from "Infrastructure/Controllers/CentralController";

// @TODO Shift these to tagged bindings when implementing Obs websocket v5
import ObsV4Connector from "Infrastructure/Adapters/ObsV4Connector/V4Connector";
import { filterObsV4EventTransformers } from "Infrastructure/Adapters/ObsV4Connector/Utility";
import * as ObsV4EventTransformers from "Infrastructure/Adapters/ObsV4Connector/Formatters";

export const centralContainer = new Container().extend(parentContainer);

// Service Adapters
centralContainer
    .bind(CENTRAL_TOKENS.obsConnector)
    .toInstance(ObsV4Connector)
    .inSingletonScope();

centralContainer
    .bind(CENTRAL_TOKENS.obsV4EventTransformers)
    .toInstance(() => filterObsV4EventTransformers(Object.values(ObsV4EventTransformers)))
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
