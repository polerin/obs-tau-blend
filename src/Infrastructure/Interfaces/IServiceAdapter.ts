import { PortMessageCallback, SystemMessageNames, AppMessageSet } from "Shared/MessageHandling";

export interface IServiceAdapter<CallbackType> 
{
    setCallback(callback : CallbackType | null) : void;

    sendMessage<MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) : void;
}