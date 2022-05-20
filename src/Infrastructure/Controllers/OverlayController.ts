import { OVERLAY_TOKENS, injected } from "Bindings";

import IControlWorker from "Infrastructure/Interfaces/IControlWorker";
import { ControlMessage, ControlRequest, ControlMessageOrEvent, ComponentDefinition } from "Infrastructure/Shared/Types";

import * as Components from "Overlay/Components";
import IOverlayComponent from "Shared/Interfaces/IOverlayCompoenent";


// hack around for now.
// This forces webpack to keep the web component instead of tree shaking it out
Object.entries(Components).forEach(([k,v]) => v.prototype);


class OverlayController {
    private controlWorker : IControlWorker;

    private defaultOptions : object = {
        'targetSelector': ".overlay-container",
        'debugSelector' : "debug-container",
        'componentMaps' : {}
    };

    private options : any = {};
    private container?: HTMLElement;
    private debugContainer? : Components.DebugContainer;

    constructor(controlWorker: IControlWorker)
    {
        this.controlWorker = controlWorker;
        this.messageHandler = this.messageHandler.bind(this);
        this.connectComponent = this.connectComponent.bind(this);

    }

    public async init(options: object = {})
    {
        this.options = {...this.defaultOptions, ...options};

        this.locateElements();
        this.connectRequestedComponents();
        this.startControlWorker();
        this.connectToObs();
    }

    protected locateElements()
    {
        this.container = window.document.querySelector(this.options.targetSelector);
        this.debugContainer = window.document.querySelector(this.options.debugSelector); 
    }

    protected connectRequestedComponents() : void
    {
        const componentMaps = this.options?.componentMaps || {};

        if (!componentMaps) {
            return;
        }

        const query = Object.keys(componentMaps).join(", ");
        const elements = document.querySelectorAll(query);

        if (!elements) {
            return;
        }

        elements.forEach(this.connectComponent);
    }

    protected connectComponent(component : Element)
    {
        if (!(<unknown>component as IOverlayComponent).componentType) {
            return;
        }


    }

    protected startControlWorker() : void
    {
        this.controlWorker.addEventListener('controlMessage', this.messageHandler)
        this.controlWorker.connect();

        this.controlWorker.dispatchMessage("overlayController.connected", {});
    }

    protected messageHandler(message : Event) : void
    {
        if (!(message as ControlMessageOrEvent).type || message.type != 'controlMessage') { 
            return;
        }

        this.debugContainer?.addMessage(<ControlMessage><unknown>message);
    }

    protected connectToObs() : void
    {
        if (!window.obsstudio) {
            this.debugContainer?.addMessage("No obs detected");
            return;
        }
    }
}

export default OverlayController;

injected(OverlayController, OVERLAY_TOKENS.controlWorker);