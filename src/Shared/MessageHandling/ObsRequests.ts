import { ObsRequest, CheckedDefinitionList } from "Shared/Definitions/Types";

export const ObsRequests = {
    // Scene
    SetCurrentScene : "obs.request.scene.switch",

    // Source
    SetSourceFilterSettings : "obs.request.source.setFilterSettings",
} as const;

export type ObsRequestSet = CheckedDefinitionList<typeof ObsRequests, {
    // Core
    
    // Scene
    [ObsRequests.SetCurrentScene] : ObsRequest & {
        sceneName : string;
    };

    // Source
    [ObsRequests.SetSourceFilterSettings] : ObsRequest & {
        sourceName : string;
        filterName : string;
        settings : Record<string, any>;
    },
}>;
