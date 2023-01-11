import { FrameworkMessageSet } from "Shared";
import IPortMessageAdapter from "./IPortMessageAdapter";

export default interface IControlWorker<MessageSet extends FrameworkMessageSet = FrameworkMessageSet> extends IPortMessageAdapter<MessageSet>
{
    connect() : Promise<boolean>;
    disconnect() : void;
}