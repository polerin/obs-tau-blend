import { DependencyModule, injected } from "brandi";

import { conf_get, buildTransformerRegistry } from "../../../../Shared/";

import { TAU_TOKENS } from "./TauTokens";
import { CENTRAL_TOKENS } from "../../../../Bindings/CentralTokens";

import TauAdapter from "../TauAdapter";
import * as TauEventTransformers from "../Formatters/Events";
import { ServiceAdapterTransformerSet } from "../../../Shared";
import { SHARED_TOKENS } from "../../../../Bindings/SharedTokens";

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
