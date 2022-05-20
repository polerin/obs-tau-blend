import { Container } from "brandi";

import { container as parentContainer } from "./Container";
import { OVERLAY_TOKENS } from "./OverlayTokens";

import { conf_get } from "Shared/AppConfig";

import OverlayController from "Infrastructure/Controllers/OverlayController";
import ControlWorker from "Infrastructure/Adapters/ControlWorker";


export const overlayContainer = new Container().extend(parentContainer);

// control worker related binds
overlayContainer
    .bind(OVERLAY_TOKENS.controlSharedWorker)
    .toInstance(() => new SharedWorker(conf_get("controlWorkerPath", "/assets/js/control_worker.js")))
    .inSingletonScope();

overlayContainer
    .bind(OVERLAY_TOKENS.controlWorker)
    .toInstance(ControlWorker)
    .inSingletonScope();

// Overlay related
overlayContainer
    .bind(OVERLAY_TOKENS.overlayController)
    .toInstance(OverlayController)
    .inSingletonScope();
