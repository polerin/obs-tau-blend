import { ExternalConnectionStatus, ServiceCallback } from "../../Infrastructure/Shared/Types";
import { FrameworkMessageSet, SystemMessageDefinitionList } from "../../Shared";

export default interface IServiceAdapter<
    MessageSet extends FrameworkMessageSet = FrameworkMessageSet,
    MessageName extends keyof MessageSet = keyof MessageSet,
    CallbackType extends ServiceCallback<MessageSet> = ServiceCallback<MessageSet>
> {
    connect() : Promise<boolean>;

    get status() : ExternalConnectionStatus;

    setCallback(callback: CallbackType) : void;

    sendMessage(messageName : MessageName, message : MessageSet[MessageName]) : void;
}