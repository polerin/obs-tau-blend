import { injected, OVERLAY_TOKENS,  SHARED_TOKENS } from "Bindings";

import IControlWorker from "Infrastructure/Interfaces/IControlWorker";
import { SystemMessageOrEvent, SystemMessage, SystemMessageNames, AppMessageSet } from "Shared/MessageHandling";

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
        this.portMessageHandler = this.portMessageHandler.bind(this);
        this.connectComponent = this.connectComponent.bind(this);

    }

    public async init(options: object = {})
    {
        this.options = {...this.defaultOptions, ...options};

        this.locateElements();
        this.connectRequestedComponents();
        this.startControlWorker();
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
        const elements = this.container?.querySelectorAll(query) || false;

        if (!elements) {
            return;
        }

        elements.forEach(this.connectComponent);
    }

    protected connectComponent(component : Element)
    {
        const overlayComponent = <unknown>component as IOverlayComponent;
        if (!overlayComponent.componentType) {
            return;
        }

        overlayComponent.registerCallbacks();
    }

    protected startControlWorker() : void
    {
        this.controlWorker.setCallback(this.portMessageHandler)
        this.controlWorker.connect();

        // this.controlWorker.dispatchMessage("overlayController.connected", {});
    }

    protected portMessageHandler<MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) : void
    {
        // @TODO actually handle messages
        this.debugContainer?.addMessage(message as SystemMessage);
    }

}

export default OverlayController;

injected(OverlayController, OVERLAY_TOKENS.controlWorker);