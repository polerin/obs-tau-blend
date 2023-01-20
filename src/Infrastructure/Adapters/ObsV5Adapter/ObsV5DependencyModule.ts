import { DependencyModule, injected } from "brandi";

import ObsWebsocket from "obs-websocket-js";

import OBS_V5_TOKENS from "./ObsV5Tokens";

import { CENTRAL_TOKENS } from "../../../Bindings/CentralTokens";
import { SHARED_TOKENS } from "../../../Bindings/SharedTokens";

import ObsV5Adapter from "./ObsV5Adapter";
import { conf_get } from "../../../Shared/Utility/AppConfig";
import { ServiceAdapterTransformerSet } from "../../Shared";
import { buildTransformerRegistry } from "../../../Shared";

import * as EventTransformers from "./Formatters/Events";
import * as RequestTransformers from "./Formatters/Requests";

injected(
  ObsV5Adapter,
  OBS_V5_TOKENS.obsWebsocket,
  OBS_V5_TOKENS.obsTransformerSet,
  SHARED_TOKENS.frameworkEventBus,
  OBS_V5_TOKENS.obsV5Options.optional
);

const obsV5DependencyModule = new DependencyModule();

obsV5DependencyModule
  .bind(CENTRAL_TOKENS.obsAdapter)
  .toInstance(ObsV5Adapter)
  .inSingletonScope();

obsV5DependencyModule
  .bind(OBS_V5_TOKENS.obsV5Options)
  .toInstance(() => conf_get("adapters.obs", {}))
  .inTransientScope();

obsV5DependencyModule
  .bind(OBS_V5_TOKENS.obsWebsocket)
  .toInstance(() => new ObsWebsocket())
  .inSingletonScope();

obsV5DependencyModule
  .bind(OBS_V5_TOKENS.obsTransformerSet)
  .toInstance(
    (): ServiceAdapterTransformerSet => ({
      event: buildTransformerRegistry(
        "event",
        Object.values(EventTransformers)
      ),
      request: buildTransformerRegistry(
        "request",
        Object.values(RequestTransformers)
      ),
    })
  )
  .inSingletonScope();

export default obsV5DependencyModule;
