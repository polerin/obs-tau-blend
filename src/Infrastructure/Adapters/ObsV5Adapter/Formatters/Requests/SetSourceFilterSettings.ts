import IV5RequestTransformer from "#adapters/ObsV5Adapter/Interfaces/IV5RequestTransformer";
import { ObsRequest, ObsResponse, SystemMessageByName } from "#shared";
import { ObsV5Requests, ObsV5Responses } from "#adapters/ObsV5Adapter/Types";


type _adapterRequest = "SetSourceFilterSettings";
type _adapterResponse = "SetSourceFilterSettings";
type _systemRequest =  typeof ObsRequest.SetSourceFilterSettings;
type _systemResponse = typeof ObsResponse.SetSourceFilterSettings;

export default class SetSourceFilterSettings implements 
    IV5RequestTransformer<_adapterRequest, _adapterResponse, _systemRequest, _systemResponse> 
{
    public readonly adapterRequestName = "SetSourceFilterSettings";
    public readonly adapterResponseName =  "SetSourceFilterSettings";
    public readonly systemRequestName = ObsRequest.SetSourceFilterSettings;
    public readonly systemResponseName = ObsResponse.SetSourceFilterSettings;
    
    public buildRequestMessage(systemMessage : SystemMessageByName<_systemRequest>) : ObsV5Requests[_adapterRequest]
    {
        return {
            sourceName : systemMessage.sourceName,
            filterName : systemMessage.filterName,
            filterSettings : systemMessage.settings
        };
    }
    
    public buildResponseMessage(adapterResponse: ObsV5Responses[_adapterResponse]): SystemMessageByName<_systemResponse> {
        throw new Error("Method not implemented.");
    }   
}