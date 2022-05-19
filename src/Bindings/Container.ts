import { Container } from "brandi";
import { TOKENS } from "./Tokens";

import { conf_get } from "Shared/AppConfig";

import ControlWorker from "Infrastructure/Workers/ControlWorker";
import OverlayController from "Infrastructure/Controllers/OverlayController";

export const container = new Container();

// control worker related binds
container
    .bind(TOKENS.controlSharedWorker)
    .toInstance(() => new SharedWorker(conf_get("controlWorkerPath", "/assets/js/control_worker")))
    .inSingletonScope();

container
    .bind(TOKENS.controlWorker)
    .toInstance(ControlWorker)
    .inSingletonScope();


// Overlay related
container
    .bind(TOKENS.overlayController)
    .toInstance(OverlayController)
    .inSingletonScope();
