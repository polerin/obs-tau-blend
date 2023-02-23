import IV5RequestTransformer from "#adapters/ObsV5Adapter/Interfaces/IV5RequestTransformer";
import { ObsRequest, ObsResponse, SystemMessageByName } from "#shared";
import { ObsV5Requests, ObsV5Responses } from "#adapters/ObsV5Adapter/Types";


type _adapterRequest = "SetCurrentProgramScene";
type _adapterResponse = "SetCurrentProgramScene";
type _systemRequest =  typeof ObsRequest.SetCurrentScene;
type _systemResponse = typeof ObsResponse.SetCurrentScene;

export default class SetCurrentScene implements 
    IV5RequestTransformer<_adapterRequest, _adapterResponse, _systemRequest, _systemResponse> 
{
    public readonly adapterRequestName = "SetCurrentProgramScene";
    public readonly adapterResponseName =  "SetCurrentProgramScene";
    public readonly systemRequestName = ObsRequest.SetCurrentScene;
    public readonly systemResponseName = ObsResponse.SetCurrentScene;
    
    public buildRequestMessage(systemMessage : SystemMessageByName<_systemRequest>) : ObsV5Requests[_adapterRequest]
    {
        if(!systemMessage.sceneName) {
            throw new Error("OBSv5: Attempted to switch scenes without supplying a new scene name");
        }

        return {
            "sceneName" : systemMessage.sceneName,
        };
    }
    
    public buildResponseMessage(adapterResponse: ObsV5Responses[_adapterResponse]): SystemMessageByName<_systemResponse> {
        return {
            name: this.systemResponseName,
            type: "obsResponse",
        };    
    } 
}
