import { SystemMessageNames, SystemMessages } from "#shared";

export default interface IAdapterResponseTransformer<
  AdapterMessageDefinitions,
  AdapterMessageName extends keyof AdapterMessageDefinitions,
  SystemResponseName extends SystemMessageNames
> {
  readonly adapterResponseName: AdapterMessageName;
  readonly systemResponseName: SystemResponseName;

  buildResponseMessage(
    adapterResponse: AdapterMessageDefinitions[AdapterMessageName]
  ): SystemMessages[SystemResponseName];
}
