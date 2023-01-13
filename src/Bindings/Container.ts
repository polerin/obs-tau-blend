import { Container } from "brandi";
import { PortMessageAdapter } from "../Infrastructure";
import { SHARED_TOKENS } from "./SharedTokens";

// import PortMessageAdapter from "Infrastructure/Shared/PortMessageAdapter";

export const container = new Container();

container
    .bind(SHARED_TOKENS.portMessageAdapter)
    .toInstance(PortMessageAdapter)
    .inTransientScope();
