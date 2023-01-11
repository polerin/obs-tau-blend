import IServiceAdapter from "Infrastructure/Interfaces/IServiceAdapter";
import TypedPubSubBus from "./TypedPubsubBus";
import {
  ExternalConnectionStatus,
  FrameworkEventBus,
  MessageSetFromTransformerSet,
  ServiceAdapterTransformerSet,
  ServiceCallback,
  TransformerClassifications,
  TransformerRegistry,
} from "./Types";

export default abstract class AbstractServiceAdapter<
  TransformerSet extends ServiceAdapterTransformerSet<any> = ServiceAdapterTransformerSet<any>,
  SystemMessageSet extends MessageSetFromTransformerSet<TransformerSet> = MessageSetFromTransformerSet<TransformerSet>,
  CallbackType extends ServiceCallback<SystemMessageSet> = ServiceCallback<SystemMessageSet>,
  TransformerClassification extends TransformerClassifications<TransformerSet> = TransformerClassifications<TransformerSet>,
> implements IServiceAdapter<SystemMessageSet>
{
  protected _callback?: CallbackType | null;
  public set callback(callback: CallbackType | null) {
    this._callback = callback;
  };
  
  public abstract get status(): ExternalConnectionStatus;

  public abstract connect(): Promise<boolean>;
  public abstract sendMessage(messageName: keyof SystemMessageSet, message: SystemMessageSet[keyof SystemMessageSet]): void;

  public constructor(protected transformers: TransformerSet, protected eventBus: FrameworkEventBus) {
    Object.values(transformers).forEach((set) =>
      this.registerTransformers(set)
    );
  }


  public setCallback(callback: CallbackType): void {
    this._callback = callback;
  }

  protected abstract registerTransformers(
    transformerSets: ServiceAdapterTransformerSet<any>
  ): void;

  protected selectTransformer<MessageTypes extends TransformerSet[TransformerClassification]>(transformerType: TransformerClassification, messageName: keyof MessageTypes) {
    if (transformerType === undefined || typeof messageName !== 'string' || this.transformers === undefined) { 
      return undefined;
    }

    // @todo this is fugly why are you like this
    const group = this.transformers[transformerType] as TransformerRegistry<any, any>;

    if (group === undefined || group === null || !(messageName in group)) {
      return undefined; 
    }
    
    return group[messageName];

  }

  protected notifyListener = (message: SystemMessageSet[keyof SystemMessageSet]): void => {
    if (this._callback) {
      this._callback(message.name, message);
    }
  }
}
