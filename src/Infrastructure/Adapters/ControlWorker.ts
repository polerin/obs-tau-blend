import { omit } from "lodash";

import { injected, OVERLAY_TOKENS, SHARED_TOKENS } from "Bindings";


import { ControlMessage } from "Shared/Types";
import { AppMessageSet, SystemMessage, SystemMessageOrEvent, PortMessage, PortMessageOrEvent, SystemMessageNames } from "Shared/MessageHandling";

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

    public connect() 
    {
        this.setPort(this.sharedWorker.port);
    }

    public disconnect()
    {
        this.closePort();
    }

}

injected(ControlWorker, OVERLAY_TOKENS.controlSharedWorker);