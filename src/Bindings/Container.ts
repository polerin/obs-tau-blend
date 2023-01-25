import { Container } from "brandi";
import { PortMessageAdapter, TypedPubSubBus } from "#infra";
import { SHARED_TOKENS } from "#root/Bindings/SharedTokens";

export const container = new Container();

container
    .bind(SHARED_TOKENS.portMessageAdapter)
    .toInstance(PortMessageAdapter)
    .inTransientScope();

container
    .bind(SHARED_TOKENS.frameworkEventBus)
    .toInstance(TypedPubSubBus)
    .inSingletonScope();