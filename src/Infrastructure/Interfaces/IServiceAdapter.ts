import { SystemMessageNames, AppMessageSet } from "Shared/MessageHandling";
import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";

export interface IServiceAdapter<CallbackType> 
{
    connect() : Promise<boolean>;

    getStatus() : ExternalConnectionStatus;

    setCallback(callback : CallbackType | null) : void;

    sendMessage<MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) : void;
}