import { CheckedDefinitionList, ControlMessage } from "Shared/Definitions/Types";

export const AppOverlayMessages = {
    OverlayOnline : "app.control.overlay.online",
    OverlayClosing : "app.control.overlay.closing",
} as const;


export type AppOverlayMessageSet = CheckedDefinitionList<
    typeof AppOverlayMessages,
    {
        [AppOverlayMessages.OverlayOnline] : ControlMessage;
        [AppOverlayMessages.OverlayClosing] : ControlMessage;
    }
>;