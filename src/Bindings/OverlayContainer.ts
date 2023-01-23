import { Container, injected } from "brandi";

import { container as parentContainer } from "@/Bindings/Container";
import { OVERLAY_TOKENS } from "@/Bindings/OverlayTokens";

import { conf_get } from "@/Shared/Utility/AppConfig";

import OverlayController from "@/Infrastructure/Controllers/OverlayController";
import ControlWorker from "@/Infrastructure/Adapters/ControlWorker";

injected(ControlWorker, OVERLAY_TOKENS.controlSharedWorker);

export const overlayContainer = new Container().extend(parentContainer);

// control worker related binds
overlayContainer
    .bind(OVERLAY_TOKENS.controlSharedWorker)
    .toInstance(() => new SharedWorker(conf_get("controlWorkerPath", `//${document.location.host}/assets/js/control_worker.js`)))
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
