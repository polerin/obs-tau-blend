import { SystemMessageNames, SystemMessageSet } from "Shared/MessageHandling";
import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";

export default interface IServiceAdapter<CallbackType, MessageSet> 
{
    connect() : Promise<boolean>;

    getStatus() : ExternalConnectionStatus;

    setCallback(callback : CallbackType | null) : void;

    sendMessage<MessageName extends keyof MessageSet>(messageName : MessageName, message : MessageSet[MessageName]) : void;
}