import { SystemMessageNames } from "Shared/MessageHandling";
import { ObsV4EventNames } from "./Definitions/EventHandlersData";
import { V4EventTransformer, V4EventTransformerSet } from "./Definitions/Types";
import IV4EventTransformer from "./Interfaces/IV4EventTransformer";

export function filterObsV4EventTransformers(potentialTransformers : any[]) : V4EventTransformerSet
{
    let transformers : V4EventTransformerSet = [];
    
    for (const transformer of potentialTransformers) {
        const instance = new transformer();

        if (instance.obsEventType) {
            transformers.push(instance);
        }
    }

    return transformers;
}