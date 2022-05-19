// Overlay entry point, this may be called individually if you know what you're doing
// but should probably fed into obs via an html page (for now?)

import { container } from "Bindings/Container";
import { TOKENS } from "Bindings/Tokens";


import { conf_get } from "Shared/AppConfig";

const overlayController = container.get(TOKENS.overlayController);
window.addEventListener('load', () => overlayController.init(conf_get('overlayController', {})));