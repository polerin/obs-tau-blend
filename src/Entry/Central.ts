import {centralContainer, CENTRAL_TOKENS } from "Bindings";
import { conf_get } from "Shared/Utility/AppConfig";

const controller = centralContainer.get(CENTRAL_TOKENS.centralController);
controller.init(conf_get("centralController", {}));

onconnect = controller.onSharedWorkerConnect;
