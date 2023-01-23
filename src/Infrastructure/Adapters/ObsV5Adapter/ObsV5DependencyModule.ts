import { DependencyModule, injected } from "brandi";

import ObsWebsocket from "obs-websocket-js";

import OBS_V5_TOKENS from "./ObsV5Tokens";

import { CENTRAL_TOKENS } from "@/Bindings/CentralTokens";
import { SHARED_TOKENS } from "@/Bindings/SharedTokens";

import ObsV5Adapter from "@/Infrastructure/Adapters/ObsV5Adapter/ObsV5Adapter";
import { ServiceAdapterTransformerSet } from "@/Infrastructure/Shared";
import { buildTransformerRegistry, conf_get } from "@/Shared";

import * as EventTransformers from "@/Infrastructure/Adapters/ObsV5Adapter/Formatters/Events";
import * as RequestTransformers from "@/Infrastructure/Adapters/ObsV5Adapter/Formatters/Requests";

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
