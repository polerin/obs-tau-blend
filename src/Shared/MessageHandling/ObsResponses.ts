import { ObsResponseMessage, CheckedDefinitionList } from "Shared/Definitions/Types";

export const ObsResponse = {
  // Core
  WebsocketAuthorized: "obs.websocket.authorized",
  WebsocketAuthorizationFailure: "obs.websocket.authorizationFailure",
  SetCurrentScene: "obs.scene.setCurrent",
  SetSourceFilterSettings: "obs.source.filter.setttings.set",
} as const;

export interface ObsResponseMessages {
    // Core
    [ObsResponse.WebsocketAuthorized]: ObsResponseMessage & {};

    [ObsResponse.WebsocketAuthorizationFailure]: ObsResponseMessage & {};

    [ObsResponse.SetCurrentScene]: ObsResponseMessage & {};

    [ObsResponse.SetSourceFilterSettings] : ObsResponseMessage & {}

}
