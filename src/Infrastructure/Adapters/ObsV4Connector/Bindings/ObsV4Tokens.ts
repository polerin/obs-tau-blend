import { token } from "brandi";

import type ObsWebsocket from "obs-websocket-js";

import { V4EventTransformerSet, V4RequestTransformerSet } from "Infrastructure/Adapters/ObsV4Connector/Definitions/Types";

export const OBS_V4_TOKENS = {
    obsWebsocket: token<ObsWebsocket>("obsWebsocket"),
    obsV4EventTransformers: token<V4EventTransformerSet>("obsV4EventTransformers"),
    obsV4RequestTransformers: token<V4RequestTransformerSet>("obsV4RequestTransformers"),
    obsV4Options : token<any>('obsV4Options') 
}