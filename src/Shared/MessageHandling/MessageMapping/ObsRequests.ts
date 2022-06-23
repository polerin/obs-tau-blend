import { ObsRequest } from "Shared/Types";

export const ObsRequests = {
    // Core
    SetCurrentScene : "obs.request.scene.switch",
} as const;

export interface ObsRequestSet {
    // Core
  
    // Scene
    [ObsRequests.SetCurrentScene] : ObsRequest & {
        name : typeof ObsRequests.SetCurrentScene;
        sceneName : string;
    };
}