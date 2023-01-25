import { ObsResponseMessage } from "#shared/Definitions/Types";

export const ObsResponse = {
  // Core
  WebsocketAuthorized: "obs.websocket.authorized",
  WebsocketAuthorizationFailure: "obs.websocket.authorizationFailure",
  SetCurrentScene: "obs.scene.response.setCurrent",
  SetSourceFilterSettings: "obs.source.filter.setttings.set",
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
