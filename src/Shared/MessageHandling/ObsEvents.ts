import { ObsEventMessage } from "../Definitions/Types";

export const ObsEvent = {
  // Scene
  SceneSwitched: "obs.scene.switched",
} as const;

export interface ObsEventMessages {
  // Scene
  [ObsEvent.SceneSwitched]: ObsEventMessage & {
    name: typeof ObsEvent.SceneSwitched;
    sceneName: string;
  };
}
