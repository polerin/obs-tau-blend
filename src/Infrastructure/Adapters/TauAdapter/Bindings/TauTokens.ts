import { token } from "brandi";
import { ServiceAdapterTransformerSet } from "Infrastructure/Shared";

export const TAU_TOKENS = {
    tauTransformers: token<ServiceAdapterTransformerSet>("tauTransformerSet"),
    tauOptions: token<object>('tauOptions'),
};