import { ObsEventMessage } from "Shared/Definitions/Types";

export const ObsEvent = {
    // Scene
    SceneSwitched : "obs.scene.switched",
} as const;

export interface ObsEventMessages {
    // Scene
    [ObsEvent.SceneSwitched] : ObsEventMessage & {
        sceneName : string;
    };
}