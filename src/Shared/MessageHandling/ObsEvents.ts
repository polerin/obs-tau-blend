import { ObsEvent, CheckedDefinitionList } from "Shared/Definitions/Types";

export const ObsEvents = {
    // Core
    WebsocketConnected : "obs.websocket.connected",
    WebsocketDisconnected : "obs.websocket.disconnected",

    // Scene
    SwitchScenes : "obs.scene.switched",
} as const;

export type ObsEventSet = CheckedDefinitionList<typeof ObsEvents, {
    // Core
    [ObsEvents.WebsocketConnected] : ObsEvent & {
    };

    [ObsEvents.WebsocketDisconnected] : ObsEvent & {
    };

    // Scene
    [ObsEvents.SwitchScenes] : ObsEvent & {
        sceneName : string;
    };
}>;