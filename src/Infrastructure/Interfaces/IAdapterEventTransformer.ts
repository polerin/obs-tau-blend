import { AppMessageSet, SystemMessageNames } from "Shared/MessageHandling";

export default interface IAdapterEventTransformer<AdapterMessageDefinitions, AdapterMessageNames extends keyof AdapterMessageDefinitions, SystemMessageName extends SystemMessageNames, AdapterMessageName extends AdapterMessageNames>
{
    adapterEventType : AdapterMessageName;
    readonly systemMessageType : SystemMessageName;

    buildSystemMessage(obsMessage : AdapterMessageDefinitions[AdapterMessageName]) : AppMessageSet[SystemMessageName]
};