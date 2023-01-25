import { token } from "brandi";

import { IControlWorker, OverlayController } from  "#infra";

export const OVERLAY_TOKENS = {
    // Service adapter
    controlSharedWorker: token<SharedWorker>("SharedWorker"),
    controlWorker: token<IControlWorker>("ControlWorker"),

    // Overlay Control
    overlayController : token<OverlayController>("overlayController")
};