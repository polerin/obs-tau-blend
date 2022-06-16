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
    [ObsMessages.WebsocketConnected] : ObsMessage & {
        name : typeof ObsMessages.WebsocketConnected;
    };

    [ObsMessages.WebsocketDisconnected] : ObsMessage & {
        name : typeof ObsMessages.WebsocketDisconnected
    };

    [ObsMessages.WebsocketAuthorized] : ObsMessage & {
        name : typeof ObsMessages.WebsocketAuthorized;
    };

    [ObsMessages.WebsocketAuthorizationFailure] : ObsMessage & {
        name : typeof ObsMessages.WebsocketAuthorizationFailure;   
    };

    // Scene
    [ObsMessages.SwitchScenes] : ObsMessage & {
        name : typeof ObsMessages.SwitchScenes;
        sceneName : string;
    };
}