import { FrameworkMessageSet, SystemMessageDefinitionList } from "Shared";

export default interface IAdapterEventTransformer<
    AdapterMessageDefinitions,
    SystemMessageDefinitions extends SystemMessageDefinitionList = FrameworkMessageSet,
    SystemMessageName extends keyof SystemMessageDefinitions = keyof SystemMessageDefinitions,
    AdapterMessageName extends keyof AdapterMessageDefinitions = keyof AdapterMessageDefinitions>
{
    readonly adapterEventName : AdapterMessageName;
    readonly systemEventName : SystemMessageName;

    buildSystemMessage(adapterMessage : AdapterMessageDefinitions[AdapterMessageName]) : SystemMessageDefinitions[SystemMessageName]
};