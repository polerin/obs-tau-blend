import { Container } from "brandi";
import { PortMessageAdapter, TypedPubSubBus } from "@/Infrastructure";
import { SHARED_TOKENS } from "@/Bindings/SharedTokens";

export const container = new Container();

container
    .bind(SHARED_TOKENS.portMessageAdapter)
    .toInstance(PortMessageAdapter)
    .inTransientScope();

container
    .bind(SHARED_TOKENS.frameworkEventBus)
    .toInstance(TypedPubSubBus)
    .inSingletonScope();