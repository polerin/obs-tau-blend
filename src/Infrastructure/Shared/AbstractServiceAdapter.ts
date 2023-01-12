import IServiceAdapter from "Infrastructure/Interfaces/IServiceAdapter";
import {
  SystemMessage,
  SystemMessageCallback,
  SystemMessageNames,
} from "Shared";
import TypedPubSubBus from "./TypedPubsubBus";
import {
  ExternalConnectionStatus,
  ServiceAdapterTransformerSet,
  TransformerClassifications,
  TransformerInterfaceType,
} from "./Types";

export default abstract class AbstractServiceAdapter
  implements IServiceAdapter
{
  protected _callback?: SystemMessageCallback;

  public set callback(callback: SystemMessageCallback | undefined) {
    this._callback = callback;
  }

  public abstract get status(): ExternalConnectionStatus;

  public abstract connect(): Promise<boolean>;

  public abstract sendMessage(
    messageName: SystemMessageNames,
    message: SystemMessage
  ): void;

  protected abstract registerTransformers(
    transformerSets: ServiceAdapterTransformerSet
  ): void;

  public constructor(
    protected transformers: ServiceAdapterTransformerSet,
    protected eventBus: TypedPubSubBus
  ) {
    this.registerTransformers(this.transformers);
  }

  public setCallback(callback: SystemMessageCallback): void {
    this._callback = callback;
  }

  protected selectTransformer(
    transformerType: TransformerClassifications,
    messageName: string
  ): TransformerInterfaceType<typeof transformerType> | undefined {
    if (
      transformerType === undefined ||
      typeof messageName !== "string" ||
      this.transformers === undefined
    ) {
      return undefined;
    }

    // @todo this is fugly why are you like this
    const group = this.transformers[transformerType];

    if (group === undefined || group === null) {
      return undefined;
    }

    if (!(messageName in group) || typeof group[messageName] === 'function') {
      return undefined;
    }

    return group[messageName];
  }

  protected notifyListener = (
    messageName: SystemMessageNames,
    message: SystemMessage
  ): void => {
    if (this._callback) {
      this._callback(messageName, message);
    }
  };
}
