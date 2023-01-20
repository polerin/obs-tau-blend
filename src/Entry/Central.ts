import {CENTRAL_TOKENS } from "../Bindings/CentralTokens";
import type { Container } from "brandi";
import { conf_fetch, conf_get, conf_load } from "../Shared/Utility/AppConfig";


export const initCentral = async (container: Container, configUri: string): Promise<void> => {
    const config = await conf_fetch(configUri);
    conf_load(config);

    const controller = container.get(CENTRAL_TOKENS.centralController);
    controller.init(conf_get("centralController", {}));

    const onconnect = controller.onSharedWorkerConnect;
}
