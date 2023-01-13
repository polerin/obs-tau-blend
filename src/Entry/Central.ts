import {CENTRAL_TOKENS } from "Bindings";
import type { Container } from "brandi";
import { conf_get } from "Shared/Utility/AppConfig";

export const initCentral = (container: Container) => {
    const controller = container.get(CENTRAL_TOKENS.centralController);
    controller.init(conf_get("centralController", {}));

    onconnect = controller.onSharedWorkerConnect;
}
