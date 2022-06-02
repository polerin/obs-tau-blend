import { ControlMessage } from "Shared/Types";

export const AppOverlayMessages = {
    OverlayOnline : "app.control.overlay.online",
    OverlayClosing : "app.control.overlay.closing",
} as const;


export interface AppOverlayMessageSet {
    [AppOverlayMessages.OverlayOnline] : ControlMessage;
    [AppOverlayMessages.OverlayOnline] : ControlMessage;
}