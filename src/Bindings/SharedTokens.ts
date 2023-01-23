import { token } from "brandi";
import { TypedPubSubBus, PortMessageAdapter } from "@/Infrastructure";

export const SHARED_TOKENS = {
    portMessageAdapter : token<PortMessageAdapter>("portMessageAdapter"),
    frameworkEventBus: token<TypedPubSubBus>('eventBus'),
};