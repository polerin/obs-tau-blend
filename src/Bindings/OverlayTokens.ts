import { token } from "brandi";

import IControlWorker from "Infrastructure/Interfaces/IControlWorker";
import OverlayController from "Infrastructure/Controllers/OverlayController";

export const OVERLAY_TOKENS = {
    // Service adapter
    controlSharedWorker: token<SharedWorker>("SharedWorker"),
    controlWorker: token<IControlWorker>("ControlWorker"),

    // Overlay Control
    overlayController : token<OverlayController>("overlayController")
};