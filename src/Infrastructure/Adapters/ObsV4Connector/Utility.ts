import { SystemMessageNames } from "Shared/MessageHandling";
import { ObsV4EventNames } from "./Definitions/EventHandlersData";
import { V4EventTransformer, V4EventTransformerSet } from "./Definitions/Types";
import IV4EventTransformer from "./Interfaces/IV4EventTransformer";

// @TODO Move to unknown[], just don't know how to do it with a class definition
export function filterObsV4EventTransformers(potentialTransformers : any[]) : V4EventTransformerSet
{
    let transformers : V4EventTransformerSet = [];
    
    for (const transformer of potentialTransformers) {
        if (typeof transformer  !== "function") {
            break;
        }

        const instance = new transformer();

        if (instance.obsEventType) {
            transformers.push(instance);
        }
    }

    return transformers;
}