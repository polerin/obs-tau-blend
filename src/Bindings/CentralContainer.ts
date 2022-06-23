import { Container } from "brandi";
import ObsWebsocket from "obs-websocket-js";

import { container as parentContainer } from "./Container";
import { CENTRAL_TOKENS } from "./CentralTokens";
import { conf_get } from "Shared/AppConfig";


import CentralController from "Infrastructure/Controllers/CentralController";

// @TODO Shift these to tagged bindings when implementing Obs websocket v5
import ObsV4Connector from "Infrastructure/Adapters/ObsV4Connector/V4Connector";
import { filterAdapterTransformers } from "Infrastructure/Shared/Utility";
import { V4EventTransformer, V4RequestTransformer } from "Infrastructure/Adapters/ObsV4Connector/Definitions/Types";
import * as ObsV4EventTransformers from "Infrastructure/Adapters/ObsV4Connector/Formatters/Events";
import * as ObsV4RequestTransformers from "Infrastructure/Adapters/ObsV4Connector/Formatters/Requests";
import { IServiceAdapter } from "Infrastructure/Interfaces/IServiceAdapter";

import TauAdapter from "Infrastructure/Adapters/TauAdapter/TauAdapter";
import * as TauEventTransformers from "Infrastructure/Adapters/TauAdapter/Formatters";
import { TauEventTransformer } from "Infrastructure/Adapters/TauAdapter/Definitions/Types";

export const centralContainer = new Container().extend(parentContainer);

// Service Adapters
centralContainer
    .bind(CENTRAL_TOKENS.obsAdapter)
    .toInstance(ObsV4Connector)
    .inSingletonScope();

centralContainer
    .bind(CENTRAL_TOKENS.obsV4EventTransformers)
    .toInstance(() => filterAdapterTransformers<V4EventTransformer>(Object.values(ObsV4EventTransformers)))
    .inSingletonScope();

centralContainer
    .bind(CENTRAL_TOKENS.obsV4RequestTransformers)
    .toInstance(() => filterAdapterTransformers<V4RequestTransformer>(Object.values(ObsV4RequestTransformers)))
    .inSingletonScope();

centralContainer
    .bind(CENTRAL_TOKENS.obsWebsocket)
    .toInstance(() => new ObsWebsocket())
    .inSingletonScope();

centralContainer
    .bind(CENTRAL_TOKENS.obsOptions)
    .toConstant(conf_get('obsConnection', {}));


centralContainer
    .bind(CENTRAL_TOKENS.tauAdapter)
    .toInstance(TauAdapter)
    .inSingletonScope();

centralContainer
    .bind(CENTRAL_TOKENS.tauEventTransformers)
    .toInstance(() => filterAdapterTransformers<TauEventTransformer>(Object.values(TauEventTransformers)))
    .inSingletonScope();

centralContainer
    .bind(CENTRAL_TOKENS.tauOptions)
    .toConstant(conf_get('tauConnection', {}));

centralContainer
    .bind(CENTRAL_TOKENS.serviceAdapters)
    .toInstance(() => {
        const adapters : IServiceAdapter<unknown, unknown>[] = [];

        adapters.push(centralContainer.get(CENTRAL_TOKENS.obsAdapter));
        adapters.push(centralContainer.get(CENTRAL_TOKENS.tauAdapter));

        return adapters;
    })
    .inSingletonScope();

// Controller
centralContainer
    .bind(CENTRAL_TOKENS.centralController)
    .toInstance(CentralController)
    .inSingletonScope();
