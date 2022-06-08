import { IServiceAdapter } from "Infrastructure/Interfaces/IServiceAdapter";
import IAdapterEventTransformer from "Infrastructure/Interfaces/IAdapterEventTransformer";

import { ExternalConnectionStatus } from "./Types";
import { SystemMessageNames } from "Shared/MessageHandling";

export default abstract class AbstractServiceAdapter<
    CallbackType,
    SystemMessageSet,
    AdapterEventSet,
    AdapterEventNames extends keyof AdapterEventSet, 
    TransformerType extends IAdapterEventTransformer<AdapterEventSet, AdapterEventNames, SystemMessageNames, AdapterEventNames>
    >
    implements IServiceAdapter<CallbackType, SystemMessageSet>
{
    protected callback? : CallbackType | null;

    // @TODO constrain me somehow?
    protected transformerRegistery: any = {};

    public abstract connect() : Promise<boolean>;
    public abstract getStatus(): ExternalConnectionStatus;
    public abstract sendMessage<MessageName extends keyof SystemMessageSet>(messageName: MessageName, message: SystemMessageSet[MessageName]): void;


    public constructor()
    {

    }

    public setCallback(callback: CallbackType | null): void
    {
        this.callback = callback;
    }

    protected registerTransformers(transformers : TransformerType[]) :void 
    {
        for (const transformer of transformers) {
            this.registerTransformer(transformer);   
        }
    }

    protected registerTransformer(transformer : TransformerType) : void 
    {
        this.transformerRegistery[transformer.adapterEventType] = transformer;
    }
}