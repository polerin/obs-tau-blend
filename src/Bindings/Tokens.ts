import { token } from "brandi";
import OverlayController from "Infrastructure/Controllers/OverlayController";

import IControlWorker from "Infrastructure/Interfaces/IControlWorker";

export const TOKENS = {
    //Control Worker
    controlSharedWorker: token<SharedWorker>("SharedWorker"),
    controlWorker: token<IControlWorker>("ControlWorker"),

    // Overlay Control
    overlayController : token<OverlayController>("overlayController")
};