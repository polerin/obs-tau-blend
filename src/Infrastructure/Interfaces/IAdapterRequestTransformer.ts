import { SystemMessageNames, SystemMessages } from "#shared";

export default interface IAdapterRequestTransformer<
  AdapterMessageDefinitions,
  AdapterRequestName extends keyof AdapterMessageDefinitions,
  SystemRequestName extends SystemMessageNames
> {
  readonly adapterRequestName: AdapterRequestName;
  readonly systemRequestName: SystemRequestName;

  buildRequestMessage(
    systemMessage: SystemMessages[SystemRequestName]
  ): AdapterMessageDefinitions[AdapterRequestName];
}
