import { token } from "brandi";
import PortMessageAdapter from "Infrastructure/Shared/PortMessageAdapter";

export const SHARED_TOKENS = {
    portMessageAdapter : token<PortMessageAdapter>("portMessageAdapter")
};