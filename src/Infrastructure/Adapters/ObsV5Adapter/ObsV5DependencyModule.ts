import { DependencyModule } from "brandi";

import ObsWebsocket from "obs-websocket-js";

import OBS_V5_TOKENS from "./ObsV5Tokens";
import { CENTRAL_TOKENS } from "Bindings";

import ObsV5Adapter from "./ObsV5Adapter";
import { conf_get } from "Shared/Utility/AppConfig";

const obsV5DependencyModule = new DependencyModule();

obsV5DependencyModule
    .bind(CENTRAL_TOKENS.obsAdapter)
    .toInstance(ObsV5Adapter)
    .inSingletonScope();

obsV5DependencyModule
    .bind(OBS_V5_TOKENS.obsV5Options)
    .toConstant(conf_get('obs.options', {}));

obsV5DependencyModule
    .bind(OBS_V5_TOKENS.obsWebsocket)
    .toInstance(() => new ObsWebsocket())
    .inSingletonScope();


// @todo Build some sort of autoloading for this

// obsV5DependencyModule
//     .bind(OBS_V5_TOKENS.obsTransformerSet)
//     .toInstance

export default obsV5DependencyModule;