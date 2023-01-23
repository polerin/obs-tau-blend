// Overlay entry point, this may be called individually if you know what you're doing
// but should probably fed into obs via an html page (for now?)
import { OVERLAY_TOKENS} from "@/Bindings/OverlayTokens";
import type { Container } from "brandi";
import { conf_get } from "@/Shared/Utility/AppConfig";
import { ControlElement, DebugContainer, FollowNotification } from "../Overlay/Components";


// THIS IS REALLY ANNOYING FIX THE SIDE EFFECTS MARKING ARGH.

export const initOverlay = (container: Container) => {
    DebugContainer.prototype;
    FollowNotification.prototype;
    ControlElement.prototype;

    const overlayController = container.get(OVERLAY_TOKENS.overlayController);
    window.addEventListener('load', () => overlayController.init(conf_get('overlayController', {})));
};