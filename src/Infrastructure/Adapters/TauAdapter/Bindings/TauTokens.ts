import { token } from "brandi";
import { ServiceAdapterTransformerSet } from "#infra/Shared/index";

export const TAU_TOKENS = {
    tauTransformers: token<ServiceAdapterTransformerSet>("tauTransformerSet"),
    tauOptions: token<object>('tauOptions'),
};