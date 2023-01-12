import { DependencyModule } from "brandi";

import { filterAdapterTransformers } from "Shared/Utility/Transformer";
import { conf_get } from "Shared/Utility/AppConfig";

import { TAU_TOKENS } from "./TauTokens";
import { CENTRAL_TOKENS } from "Bindings";

import TauAdapter from "../TauAdapter";
import * as TauEventTransformers from "../Formatters/Events";


export const tauDependencyModule = new DependencyModule();

tauDependencyModule
    .bind(CENTRAL_TOKENS.tauAdapter)
    .toInstance(TauAdapter)
    .inSingletonScope();

tauDependencyModule
    .bind(TAU_TOKENS.tauEventTransformers)
    .toInstance(() => filterAdapterTransformers<>(Object.values(TauEventTransformers)))
    .inSingletonScope();

tauDependencyModule
    .bind(TAU_TOKENS.tauOptions)
    .toConstant(conf_get('tauConnection', {}));