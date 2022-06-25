import { ObsRequest } from "Shared/Definitions/Types";

export const ObsRequests = {
    // Scene
    SetCurrentScene : "obs.request.scene.switch",

    // Source
    SetSourceFilterSettings : "obs.request.source.setFilterSettings"
} as const;

export interface ObsRequestSet {
    // Core
  
    // Scene
    [ObsRequests.SetCurrentScene] : ObsRequest & {
        name : typeof ObsRequests.SetCurrentScene;
        sceneName : string;
    };

    // Source
    [ObsRequests.SetSourceFilterSettings] : ObsRequest & {
        name : typeof ObsRequests.SetSourceFilterSettings,
        sourceName : string;
        filterName : string;
        settings : Record<string, any>;
    }
}