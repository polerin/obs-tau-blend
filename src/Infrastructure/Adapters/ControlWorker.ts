import { IControlWorker } from "#infra/Interfaces/index";
import { PortMessageAdapter } from "#infra/Shared/index";

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
