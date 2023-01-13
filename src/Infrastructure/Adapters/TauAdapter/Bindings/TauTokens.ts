import { token } from "brandi";
import { ServiceAdapterTransformerSet } from "../../../Shared";

export const TAU_TOKENS = {
    tauTransformers: token<ServiceAdapterTransformerSet>("tauTransformerSet"),
    tauOptions: token<object>('tauOptions'),
};