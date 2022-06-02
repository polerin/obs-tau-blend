import { V4EventTransformerSet } from "./Definitions/Types";
import IV4EventTransformer from "./Interfaces/IV4EventTransformer";

export function filterObsV4EventTransformers(potentialTransformers : any[]) : V4EventTransformerSet
{
    let transformers : V4EventTransformerSet = [];
   
    for (const transformer of potentialTransformers) {
        if ((transformer as IV4EventTransformer<any, any>).obsMessageType) {
            transformers.push(transformer);
        }
    }

    return transformers;
}