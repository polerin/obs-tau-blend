import { ObsMessage } from "Shared/Types";

export const ObsMessages = {
    WebsocketConnected : "obs.websocket.connected",
    WebsocketDisconnected : "obs.websocket.disconnected"
} as const;

export interface ObsMessageSet {
    [ObsMessages.WebsocketConnected] : ObsMessage;
    [ObsMessages.WebsocketDisconnected] : ObsMessage;
}