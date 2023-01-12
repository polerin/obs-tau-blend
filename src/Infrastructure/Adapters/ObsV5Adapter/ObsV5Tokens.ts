import { token } from "brandi";
import { ServiceAdapterTransformerSet } from "Infrastructure/Shared";

import type ObsWebsocket from "obs-websocket-js";

const OBS_V5_TOKENS = {
    obsWebsocket: token<ObsWebsocket>("obsWebsocket"),
    obsTransformerSet: token<ServiceAdapterTransformerSet>("obsTransformerSet"),
    obsV5Options: token<any>('obsV5Options')
};

export default OBS_V5_TOKENS;