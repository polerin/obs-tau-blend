import { DependencyModule } from "brandi";

import { conf_get, buildTransformerRegistry } from "../../../../Shared/";

import { TAU_TOKENS } from "./TauTokens";
import { CENTRAL_TOKENS } from "../../../../Bindings";

import TauAdapter from "../TauAdapter";
import * as TauEventTransformers from "../Formatters/Events";
import { ServiceAdapterTransformerSet } from "../../../Shared";

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
  .toConstant(conf_get("tauConnection", {}));
