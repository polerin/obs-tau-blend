import { ObsRequestMessage } from "#shared/Definitions/Types/index";

export const ObsRequest = {
  // Scene
  SetCurrentScene: "obs.request.scene.switch",

  // Source
  SetSourceFilterSettings: "obs.request.source.filter.settings.set",
} as const;

export interface ObsRequestMessages {
  // Core

  // Scene
  [ObsRequest.SetCurrentScene]: ObsRequestMessage & {
    name: typeof ObsRequest.SetCurrentScene;
    sceneName: string;
  };

  // Source
  [ObsRequest.SetSourceFilterSettings]: ObsRequestMessage & {
    name: typeof ObsRequest.SetSourceFilterSettings;
    sourceName: string;
    filterName: string;
    settings: Record<string, any>;
  };
}
