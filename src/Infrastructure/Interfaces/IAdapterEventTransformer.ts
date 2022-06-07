import { AppMessageSet, SystemMessageNames } from "Shared/MessageHandling";

export default interface IAdapterEventTransformer<AdapterMessageDefinitions, AdapterMessageNames extends keyof AdapterMessageDefinitions, SystemMessageName extends SystemMessageNames, AdapterMessageName extends AdapterMessageNames>
{
    readonly adapterEventType : AdapterMessageName;
    readonly systemMessageType : SystemMessageName;

    buildSystemMessage(adapterMessage : AdapterMessageDefinitions[AdapterMessageName]) : AppMessageSet[SystemMessageName]
};