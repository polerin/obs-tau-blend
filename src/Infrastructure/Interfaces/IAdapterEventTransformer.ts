import { SystemMessageNames, SystemMessages } from "#shared";

export default interface IAdapterEventTransformer<
    AdapterMessageDefinitions,
    AdapterEventName extends keyof AdapterMessageDefinitions,
    SystemEventName extends SystemMessageNames>
{
    readonly adapterEventName: AdapterEventName;
    readonly systemEventName: SystemMessageNames;

    buildEventMessage(adapterMessage : AdapterMessageDefinitions[AdapterEventName]) : SystemMessages[SystemEventName]
};