import IV4RequestTransformer from "../../Interfaces/IV4RequestTransformer";
import { ObsV4Requests } from "../../Definitions/RequestMethodsArgs";
import { ObsRequests, FrameworkMessageSet } from "Shared/MessageHandling";

export class SetCurrentScene implements 
    IV4RequestTransformer<typeof ObsRequests.SetCurrentScene, "SetCurrentScene"> 
{        
    public readonly adapterRequestType = "SetCurrentScene";
    public readonly systemMessageType = ObsRequests.SetCurrentScene;
    public readonly voidReturn: boolean = false;

    public buildAdapterMessage(systemMessage : FrameworkMessageSet[typeof ObsRequests.SetCurrentScene]) : ObsV4Requests["SetCurrentScene"]
    {
        return {
            "scene-name" : systemMessage.sceneName
        } as ObsV4Requests["SetCurrentScene"];
    }
}