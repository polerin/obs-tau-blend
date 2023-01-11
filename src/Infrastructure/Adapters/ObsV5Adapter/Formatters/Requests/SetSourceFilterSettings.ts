import IV4RequestTransformer from "../../Interfaces/IV4RequestTransformer";
import { ObsV4Requests } from "../../Definitions/RequestMethodsArgs";
import { ObsRequests, FrameworkMessageSet } from "Shared/MessageHandling";


type  SourceFilterMessage = FrameworkMessageSet[typeof ObsRequests.SetSourceFilterSettings];

export class SetSourceFilterSettings implements 
    IV4RequestTransformer<typeof ObsRequests.SetSourceFilterSettings, "SetSourceFilterSettings"> 
{        
    public readonly adapterRequestType = "SetSourceFilterSettings";
    public readonly systemMessageType = ObsRequests.SetSourceFilterSettings;
    public readonly voidReturn: boolean = false;

    private requiredFields : (keyof SourceFilterMessage)[] = ["sourceName", "filterName"];

    public buildAdapterMessage(systemMessage : SourceFilterMessage) : ObsV4Requests["SetSourceFilterSettings"]
    {
        for (const fieldName of this.requiredFields) {
            if (!systemMessage[fieldName] || systemMessage[fieldName]) {

                throw "Invalid message format, missing field " + fieldName;
            }
        }

        return {
            sourceName : systemMessage.sourceName,
            filterName : systemMessage.filterName,
            filterSettings : systemMessage.settings
        } as ObsV4Requests["SetSourceFilterSettings"];
    }
}