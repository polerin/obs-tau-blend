export default interface IAdapterResponseTransformer<
    SystemMessageDefinitions,
    AdapterMessageDefinitions,
    SystemMessageName extends keyof SystemMessageDefinitions = keyof SystemMessageDefinitions,
    AdapterMessageName extends keyof AdapterMessageDefinitions = keyof AdapterMessageDefinitions>
{
    readonly adapterResponseName : AdapterMessageName;
    readonly systemResponseName : SystemMessageName;
    // readonly voidReturn : AdapterMessageDefinitions[AdapterMessageName] extends void ? true : false;

    buildResponseMessage(adapterResponse: AdapterMessageDefinitions[AdapterMessageName]) : SystemMessageDefinitions[SystemMessageName]
};