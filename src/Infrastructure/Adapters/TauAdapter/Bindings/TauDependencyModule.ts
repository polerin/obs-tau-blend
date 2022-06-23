import { DependencyModule } from "brandi";

import { filterAdapterTransformers } from "Shared/Utility/Transformer";
import { conf_get } from "Shared/AppConfig";

import { TAU_TOKENS } from "./TauTokens";
import { CENTRAL_TOKENS } from "Bindings";

import TauAdapter from "../TauAdapter";
import { TauEventTransformer } from "../Definitions/Types";
import * as TauEventTransformers from "../Formatters/Events";


export const tauDependencyModule = new DependencyModule();

tauDependencyModule
    .bind(CENTRAL_TOKENS.tauAdapter)
    .toInstance(TauAdapter)
    .inSingletonScope();

tauDependencyModule
    .bind(TAU_TOKENS.tauEventTransformers)
    .toInstance(() => filterAdapterTransformers<TauEventTransformer>(Object.values(TauEventTransformers)))
    .inSingletonScope();

tauDependencyModule
    .bind(TAU_TOKENS.tauOptions)
    .toConstant(conf_get('tauConnection', {}));