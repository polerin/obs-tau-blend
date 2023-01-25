import { Container, injected } from "brandi";

import { container as parentContainer } from "#root/Bindings/Container";
import { OVERLAY_TOKENS } from "#root/Bindings/OverlayTokens";

import { conf_get } from "#shared";

import { OverlayController, ControlWorker} from "#infra";

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
