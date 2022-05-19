import IControlWorker from "Infrastructure/Interfaces/IControlWorker";

export default class ControlWorker implements IControlWorker
{
    private sharedWorker : SharedWorker;

    constructor(sharedWorker : SharedWorker)
    {
        this.sharedWorker = sharedWorker;
    }

    disconnect()
    {
        if (this.sharedWorker) {
            this.sharedWorker.port.close();
        }
    }
}