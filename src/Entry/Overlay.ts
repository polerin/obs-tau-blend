// Overlay entry point, this may be called individually if you know what you're doing
// but should probably fed into obs via an html page (for now?)
import { OVERLAY_TOKENS} from "#root/Bindings/OverlayTokens";
import type { Container } from "brandi";
import { ControlElement, DebugContainer, FollowNotification } from "#overlay";
import { conf_get } from "#shared";


// THIS IS REALLY ANNOYING FIX THE SIDE EFFECTS MARKING ARGH.

export const initOverlay = (container: Container) => {
    DebugContainer.prototype;
    FollowNotification.prototype;
    ControlElement.prototype;

    const overlayController = container.get(OVERLAY_TOKENS.overlayController);
    window.addEventListener('load', () => overlayController.init(conf_get('overlayController', {})));
};