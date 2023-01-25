import { token } from "brandi";
import type { TypedPubSubBus, PortMessageAdapter } from "#infra";

export const SHARED_TOKENS = {
    portMessageAdapter : token<PortMessageAdapter>("portMessageAdapter"),
    frameworkEventBus: token<TypedPubSubBus>('eventBus'),
};