import { DependencyModule, injected } from "brandi";

import { conf_get, buildTransformerRegistry } from "#shared";

import { TAU_TOKENS } from "#adapters/TauAdapter/Bindings/TauTokens";
import { CENTRAL_TOKENS } from "#root/Bindings/CentralTokens";

import TauAdapter from "#adapters/TauAdapter/TauAdapter";
import * as TauEventTransformers from "#adapters/TauAdapter/Formatters/Events/index";
import { ServiceAdapterTransformerSet } from "#infra/Shared/index";
import { SHARED_TOKENS } from "#root/Bindings/SharedTokens";

injected(
  TauAdapter,
  TAU_TOKENS.tauTransformers,
  SHARED_TOKENS.frameworkEventBus,
  TAU_TOKENS.tauOptions.optional
);

export const tauDependencyModule = new DependencyModule();

tauDependencyModule
  .bind(CENTRAL_TOKENS.tauAdapter)
  .toInstance(TauAdapter)
  .inSingletonScope();

tauDependencyModule
  .bind(TAU_TOKENS.tauTransformers)
  .toInstance(
    (): ServiceAdapterTransformerSet => ({
      event: buildTransformerRegistry(
        "event",
        Object.values(TauEventTransformers)
      ),
    })
  )
  .inSingletonScope();

tauDependencyModule
  .bind(TAU_TOKENS.tauOptions)
  .toInstance(() => conf_get("adapters.tau", {}))
  .inTransientScope();
