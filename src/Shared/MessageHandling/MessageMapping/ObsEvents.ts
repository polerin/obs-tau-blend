import { ObsMessage } from "Shared/Types";

export const ObsMessages = {
    // Core
    WebsocketConnected : "obs.websocket.connected",
    WebsocketDisconnected : "obs.websocket.disconnected",
    WebsocketAuthorized : "obs.websocket.authorized",
    WebsocketAuthorizationFailure: "obs.websocket.authorizationFailure",

    // Scene
    SwitchScenes : "obs.scene.switched",
} as const;

export interface ObsMessageSet {
    // Core
    [ObsMessages.WebsocketConnected] : ObsMessage;
    [ObsMessages.WebsocketDisconnected] : ObsMessage;
    [ObsMessages.WebsocketAuthorized] : ObsMessage;
    [ObsMessages.WebsocketAuthorizationFailure] : ObsMessage;

    // Scene
    [ObsMessages.SwitchScenes] : ObsMessage & {
        sceneName : string;
    };
}