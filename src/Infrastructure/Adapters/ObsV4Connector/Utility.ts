import { SystemMessageNames } from "Shared/MessageHandling";
import { ObsV4EventNames } from "./Definitions/EventHandlersData";
import { V4EventTransformer, V4EventTransformerSet } from "./Definitions/Types";
import IV4EventTransformer from "./Interfaces/IV4EventTransformer";

// @TODO Move to unknown[], just don't know how to do it with a class definition
export function filterEventTransformers<TransformerType>(potentialTransformers : any[]) : TransformerType[]
{
    let transformers : TransformerType[] = [];
    
    for (const transformer of potentialTransformers) {
        if (typeof transformer  !== "function") {
            break;
        }

        const instance = new transformer();

        if (instance.adapterEventType) {
            transformers.push(instance);
        }
    }

    return transformers;
}