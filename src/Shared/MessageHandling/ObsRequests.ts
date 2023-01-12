import { ObsRequestMessage } from "Shared/Definitions/Types";

export const ObsRequest = {
    // Scene
    SetCurrentScene : "obs.request.scene.switch",

    // Source
    SetSourceFilterSettings : "obs.request.source.setFilterSettings",
} as const;

export interface ObsRequestMessages {
    // Core
    
    // Scene
    [ObsRequest.SetCurrentScene] : ObsRequestMessage & {
        sceneName : string;
    };

    // Source
    [ObsRequest.SetSourceFilterSettings] : ObsRequestMessage & {
        sourceName : string;
        filterName : string;
        settings : Record<string, any>;
    },
}
