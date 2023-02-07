import {CENTRAL_TOKENS } from "#root/Bindings/CentralTokens";
import type { Container } from "brandi";
import { conf_fetch, conf_get, conf_load } from "#shared";
import CentralController from "#infra/Controllers/CentralController";

export const initCentral = async (container: Container, configUri: string, messagePort: MessagePort): Promise<void> => {
    const config = await conf_fetch(configUri);
    conf_load(config);

    const controller = container.get(CENTRAL_TOKENS.centralController);
    controller.init(conf_get("centralController", {}), messagePort);
}

export { centralContainer } from "#root/Bindings/CentralContainer";
export { SHARED_TOKENS } from "#root/Bindings/SharedTokens";

export {
    CENTRAL_TOKENS,
    CentralController
};
