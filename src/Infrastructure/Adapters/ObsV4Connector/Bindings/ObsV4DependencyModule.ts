import { DependencyModule } from "brandi";

import ObsWebsocket from "obs-websocket-js";

import { filterAdapterTransformers } from "Shared/Utility/Transformer";

import { OBS_V4_TOKENS } from "./ObsV4Tokens";
import { CENTRAL_TOKENS } from "Bindings";

import ObsV4Connector from "../V4Connector";
import { V4EventTransformer, V4RequestTransformer } from "../Definitions/Types";
import * as ObsV4EventTransformers from "../Formatters/Events";
import * as ObsV4RequestTransformers from "../Formatters/Requests";
import { conf_get } from "Shared/AppConfig";

export const obsV4DependencyModule = new DependencyModule();

obsV4DependencyModule
    .bind(CENTRAL_TOKENS.obsAdapter)
    .toInstance(ObsV4Connector)
    .inSingletonScope();

obsV4DependencyModule
    .bind(OBS_V4_TOKENS.obsV4Options)
    .toConstant(conf_get('obs.options', {}));

obsV4DependencyModule
    .bind(OBS_V4_TOKENS.obsWebsocket)
    .toInstance(() => new ObsWebsocket())
    .inSingletonScope();

obsV4DependencyModule
    .bind(OBS_V4_TOKENS.obsV4EventTransformers)
    .toInstance(() => filterAdapterTransformers<V4EventTransformer>(Object.values(ObsV4EventTransformers)))
    .inSingletonScope();

obsV4DependencyModule
    .bind(OBS_V4_TOKENS.obsV4RequestTransformers)
    .toInstance(() => filterAdapterTransformers<V4RequestTransformer>(Object.values(ObsV4RequestTransformers)))
    .inSingletonScope();