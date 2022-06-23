

// @TODO Move to unknown[], just don't know how to do it with a class definition
export function filterAdapterTransformers<TransformerType>(potentialTransformers : any[]) : TransformerType[]
{
    let transformers : TransformerType[] = [];
    
    for (const transformer of potentialTransformers) {
        if (typeof transformer  !== "function") {
            break;
        }

        const instance = new transformer();

        if (instance.systemMessageType) {
            transformers.push(instance);
        }
    }

    return transformers;
}