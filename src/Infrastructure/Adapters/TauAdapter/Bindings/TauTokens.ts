import { token } from "brandi";

import { TauEventTransformerSet } from "../Definitions/Types";


export const TAU_TOKENS = {
    tauEventTransformers: token<TauEventTransformerSet>("tauTransformers"),
    tauOptions: token<object>('tauOptions'),
};