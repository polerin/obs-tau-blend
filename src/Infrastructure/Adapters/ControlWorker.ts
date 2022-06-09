import { injected, OVERLAY_TOKENS } from "Bindings";

import IControlWorker from "Infrastructure/Interfaces/IControlWorker";
import PortMessageAdapter from "Infrastructure/Shared/PortMessageAdapter";

export default class ControlWorker extends PortMessageAdapter implements IControlWorker
{
    private sharedWorker : SharedWorker;

    constructor(sharedWorker : SharedWorker)
    {
        super();
        this.sharedWorker = sharedWorker;
    }

    public connect() : Promise<boolean>
    {
        this.setPort(this.sharedWorker.port);
        return super.connect();
    }

    public disconnect()
    {
        this.closePort();
    }

}

injected(ControlWorker, OVERLAY_TOKENS.controlSharedWorker);