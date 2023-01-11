import { ObsResponse, CheckedDefinitionList } from "Shared/Definitions/Types";

export const ObsResponses = {
  // Core
  WebsocketAuthorized: "obs.websocket.authorized",
  WebsocketAuthorizationFailure: "obs.websocket.authorizationFailure",
} as const;

export type ObsResponseSet = CheckedDefinitionList<
  typeof ObsResponses,
  {
    // Core
    [ObsResponses.WebsocketAuthorized]: ObsResponse & {
    };

    [ObsResponses.WebsocketAuthorizationFailure]: ObsResponse & {
    };
  }
>;
