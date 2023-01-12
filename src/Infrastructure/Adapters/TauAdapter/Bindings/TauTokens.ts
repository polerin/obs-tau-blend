import { token } from "brandi";
import { ServiceAdapterTransformerSet } from "Infrastructure/Shared";

export const TAU_TOKENS = {
    tauEventTransformers: token<ServiceAdapterTransformerSet>("tauTransformers"),
    tauOptions: token<object>('tauOptions'),
};