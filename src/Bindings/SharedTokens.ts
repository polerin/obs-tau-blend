import { token } from "brandi";
import { FrameworkEventBus } from "Infrastructure";
import PortMessageAdapter from "Infrastructure/Shared/PortMessageAdapter";

export const SHARED_TOKENS = {
    portMessageAdapter : token<PortMessageAdapter<any>>("portMessageAdapter"),
    frameworkEventBus: token<FrameworkEventBus>('eventBus'),
};