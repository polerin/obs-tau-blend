import { CheckedDefinitionList, FrameworkMessageSet } from "Shared";
import IServiceAdapter from "./IServiceAdapter";

export default interface IPortMessageAdapter<MessageSet extends FrameworkMessageSet = FrameworkMessageSet> extends IServiceAdapter<MessageSet>
{
    setPort(workerPort : MessagePort | null) : void;
    closePort() : void;
}