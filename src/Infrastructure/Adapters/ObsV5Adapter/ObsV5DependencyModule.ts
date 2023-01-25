import { DependencyModule, injected } from "brandi";

import ObsWebsocket from "obs-websocket-js";

import OBS_V5_TOKENS from "#adapters/ObsV5Adapter/ObsV5Tokens";

import { CENTRAL_TOKENS } from "#root/Bindings/CentralTokens";
import { SHARED_TOKENS } from "#root/Bindings/SharedTokens";

import ObsV5Adapter from "#adapters/ObsV5Adapter/ObsV5Adapter";
import { ServiceAdapterTransformerSet } from "#infra/Shared/index";
import { buildTransformerRegistry, conf_get } from "#shared";

import * as EventTransformers from "#adapters/ObsV5Adapter/Formatters/Events/index";
import * as RequestTransformers from "#adapters/ObsV5Adapter/Formatters/Requests/index";

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
