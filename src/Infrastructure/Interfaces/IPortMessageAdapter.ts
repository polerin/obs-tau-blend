import { PortMessageCallback, AppMessageSet } from "Shared/MessageHandling";
import { IServiceAdapter } from "./IServiceAdapter";

export default interface IPortMessageAdapter extends IServiceAdapter<PortMessageCallback, AppMessageSet>
{
    setPort(workerPort : MessagePort | null) : void;
    closePort() : void;
}