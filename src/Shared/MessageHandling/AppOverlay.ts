import {
  ControlMessage,
} from "Shared/Definitions/Types";

export const AppOverlay = {
  OverlayOnline: "app.control.overlay.online",
  OverlayClosing: "app.control.overlay.closing",
} as const;

export interface AppOverlayMessages {
  [AppOverlay.OverlayOnline]: ControlMessage;
  [AppOverlay.OverlayClosing]: ControlMessage;
}
