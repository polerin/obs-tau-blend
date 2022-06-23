export default interface IAdapterRequestTransformer<
    SystemMessageDefinitions,
    AdapterMessageDefinitions,
    SystemMessageName extends keyof SystemMessageDefinitions,
    AdapterMessageName extends keyof AdapterMessageDefinitions>
{
    readonly adapterRequestType : AdapterMessageName;
    readonly systemMessageType : SystemMessageName;
    // readonly voidReturn : AdapterMessageDefinitions[AdapterMessageName] extends void ? true : false;

    buildAdapterMessage(systemMessage : SystemMessageDefinitions[SystemMessageName]) : AdapterMessageDefinitions[AdapterMessageName]
};