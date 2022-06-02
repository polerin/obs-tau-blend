import { PortMessageCallback, SystemMessageNames, AppMessageSet } from "Shared/MessageHandling";
import { IServiceAdapter } from "./IServiceAdapter";

export default interface IPortMessageAdapter extends IServiceAdapter<PortMessageCallback>
{
    setPort(workerPort : MessagePort | null) : void;
    closePort() : void;
}