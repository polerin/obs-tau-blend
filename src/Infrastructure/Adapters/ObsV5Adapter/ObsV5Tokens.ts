import { token } from "brandi";
import { MessageSetFromTransformerSet } from "../..";

import type ObsWebsocket from "obs-websocket-js";

import { ObsV5TransformerSet } from "./Types";

const OBS_V5_TOKENS = {
    obsWebsocket: token<ObsWebsocket>("obsWebsocket"),
    obsTransformerSet: token<ObsV5TransformerSet>("obsTransformerSet"),
    obsV5Options: token<any>('obsV5Options'),
    obsEventBus:  token<MessageSetFromTransformerSet<ObsV5TransformerSet>>('obsV5EventBus'),
};

export default OBS_V5_TOKENS;