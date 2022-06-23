import { PortMessageCallback, SystemMessageSet } from "Shared/MessageHandling";
import { IServiceAdapter } from "./IServiceAdapter";

export default interface IPortMessageAdapter extends IServiceAdapter<PortMessageCallback, SystemMessageSet>
{
    setPort(workerPort : MessagePort | null) : void;
    closePort() : void;
}