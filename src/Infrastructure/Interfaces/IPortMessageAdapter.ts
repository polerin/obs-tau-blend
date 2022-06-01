import { PortMessageCallback, SystemMessageNames, AppMessageSet } from "Shared/MessageHandling";

export default interface IPortMessageAdapter 
{
    setPort(workerPort : MessagePort | null) : void;

    setCallback(callback : PortMessageCallback | null) : void;

    closePort() : void;

    sendMessage<MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) : void;
}