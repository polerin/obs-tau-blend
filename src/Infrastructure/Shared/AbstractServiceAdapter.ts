import {
  SystemMessageCallback,
  SystemMessageNames,
  SystemMessage,
} from "#shared";
import { IServiceAdapter } from "#infra/Interfaces/index";
import TypedPubSubBus from "#infra/Shared/TypedPubsubBus";
import {
  ExternalConnectionStatus,
  ServiceAdapterTransformerSet,
  TransformerClassifications,
  ServiceAdapterTransformer,
} from "#infra/Shared/Types";

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



  public constructor(
    protected transformers: ServiceAdapterTransformerSet,
    protected eventBus: TypedPubSubBus
  ) {
  }

  public setCallback(callback: SystemMessageCallback): void {
    this._callback = callback;
  }

  protected registerTransformers(
    transformerSets: ServiceAdapterTransformerSet
  ): void {
    this.registerEventTransformers(transformerSets);
    this.registerRequestTransformers(transformerSets);
  }

  protected abstract registerEventTransformers(transformerSets: ServiceAdapterTransformerSet): void;
  protected abstract registerRequestTransformers(transformerSets: ServiceAdapterTransformerSet): void;
  protected abstract registerResponseTransformers(transformerSets: ServiceAdapterTransformerSet): void;

  protected selectTransformer(
    transformerType: TransformerClassifications,
    messageName: string
  ): ServiceAdapterTransformer | undefined {
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

    if (!(messageName in group) || typeof group[messageName] === "function") {
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
