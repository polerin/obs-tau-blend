// Overlay entry point, this may be called individually if you know what you're doing
// but should probably fed into obs via an html page (for now?)
import { OVERLAY_TOKENS} from "../Bindings/OverlayTokens";
import type { Container } from "brandi";
import { conf_get } from "../Shared/Utility/AppConfig";

export const initOverlay = (container: Container) => {
    const overlayController = container.get(OVERLAY_TOKENS.overlayController);
    window.addEventListener('load', () => overlayController.init(conf_get('overlayController', {})));
};