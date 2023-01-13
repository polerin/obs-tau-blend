import { ControlMessage } from "../Definitions/Types";

export const AppOverlay = {
  OverlayOnline: "app.control.overlay.online",
  OverlayClosing: "app.control.overlay.closing",
} as const;

export interface AppOverlayMessages {
  [AppOverlay.OverlayOnline]: ControlMessage & {
    name: typeof AppOverlay.OverlayOnline;
  };
  [AppOverlay.OverlayClosing]: ControlMessage & {
    name: typeof AppOverlay.OverlayClosing;
  };
}
