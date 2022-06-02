import { ObsMessage } from "Shared/Types";

export const ObsMessages = {
    // Core
    WebsocketConnected : "obs.websocket.connected",
    WebsocketDisconnected : "obs.websocket.disconnected",

    // Scene
    SwitchScenes : "obs.scene.switched",
} as const;

export interface ObsMessageSet {
    // Core
    [ObsMessages.WebsocketConnected] : ObsMessage;
    [ObsMessages.WebsocketDisconnected] : ObsMessage;

    // Scene
    [ObsMessages.SwitchScenes] : ObsMessage & {
        sceneName : string;
    };
}