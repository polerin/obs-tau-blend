import { ObsResponseMessage } from "#shared/Definitions/Types/index";

export const ObsResponse = {
  // Core
  WebsocketAuthorized: "obs.websocket.authorized",
  WebsocketAuthorizationFailure: "obs.websocket.authorizationFailure",
  SetCurrentScene: "obs.response.scene.setCurrent",
  SetSourceFilterSettings: "obs.response.source.filter.settings.set",
} as const;

export interface ObsResponseMessages {
  // Core
  [ObsResponse.WebsocketAuthorized]: ObsResponseMessage & {
    name: typeof ObsResponse.WebsocketAuthorized;
  };

  [ObsResponse.WebsocketAuthorizationFailure]: ObsResponseMessage & {
    name: typeof ObsResponse.WebsocketAuthorizationFailure;
  };

  [ObsResponse.SetCurrentScene]: ObsResponseMessage & {
    name: typeof ObsResponse.SetCurrentScene;
  };

  [ObsResponse.SetSourceFilterSettings]: ObsResponseMessage & {
    name: typeof ObsResponse.SetSourceFilterSettings;
  };
}
