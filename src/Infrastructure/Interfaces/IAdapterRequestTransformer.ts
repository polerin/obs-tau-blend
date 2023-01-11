import { FrameworkMessageSet } from "Shared";

export default interface IAdapterRequestTransformer<
    AdapterMessageDefinitions,
    SystemMessageDefinitions = FrameworkMessageSet,
    SystemMessageName extends keyof SystemMessageDefinitions = keyof SystemMessageDefinitions,
    AdapterMessageName extends keyof AdapterMessageDefinitions = keyof AdapterMessageDefinitions>
{
    readonly adapterRequestName : AdapterMessageName;
    readonly systemRequestName : SystemMessageName;
    // readonly voidReturn : AdapterMessageDefinitions[AdapterMessageName] extends void ? true : false;

    buildAdapterMessage(systemMessage : SystemMessageDefinitions[SystemMessageName]) : AdapterMessageDefinitions[AdapterMessageName]
};