import { injected } from "brandi";

import { TOKENS } from "Bindings/Tokens";

import IControlWorker from "Infrastructure/Interfaces/IControlWorker";

import { FollowNotification } from "Overlay/Components";



class OverlayController {
    private controlWorker : IControlWorker;
    private defaultOptions : object = {
        'targetSelector': "#ovelay-container"
    };

    private options : object = {};

    constructor(controlWorker: IControlWorker)
    {
        this.controlWorker = controlWorker;

    }

    init(options: object = {})
    {
        this.options = {...this.defaultOptions, ...options};
        const one = new FollowNotification()
    }
}

export default OverlayController;

injected(OverlayController, TOKENS.controlWorker);