import _ from "lodash";

import { injected, OVERLAY_TOKENS } from "Bindings";

import IControlWorker from "Infrastructure/Interfaces/IControlWorker";
import { SystemMessage, SystemMessageNames, SystemMessageSet, AppOverlayMessages } from "Shared/MessageHandling";

import * as Components from "Overlay/Components";
import IOverlayComponent from "Shared/Interfaces/IOverlayCompoenent";
import { publish } from "Infrastructure/Shared/TypedPubsub";
import { subscribe } from "pubsub-js";
import { isSystemMessage, isSystemMessageName } from "Shared/Utility/Message";


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
        this.busMessageHandler = this.busMessageHandler.bind(this);
        
        this.startControlWorker();
    }

    public async init(options: object = {})
    {
        this.options = {...this.defaultOptions, ...options};

        this.locateElements();
        this.connectRequestedComponents();
        
        // Not using typed subscribe so we can say "gimmie everything"
        subscribe('*', this.busMessageHandler);

        this.controlWorker.sendMessage(AppOverlayMessages.OverlayOnline, {
            type: "controlMessage",
            name: AppOverlayMessages.OverlayOnline
        });
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
        console.debug("Control Worker starting");
        this.controlWorker.setCallback(this.portMessageHandler);
        this.controlWorker.connect();
    }

    protected portMessageHandler<MessageName extends SystemMessageNames>(messageName : MessageName, message : SystemMessageSet[MessageName]) : void
    {
        console.log("Received port message on overlay: ", message);
        this.debugContainer?.addMessage(message as SystemMessage);

        message.source = "Port";

        // if message handler returns true or no handler, publish message
        if(this.callMessageHandler(messageName, message)) {
            publish(messageName, message);
        }
    }

    // @todo move this to the DynamicMethodCall mixin/decorator
    // Also implement in CentralController
    protected callMessageHandler<MessageName extends SystemMessageNames>(messageName : MessageName, message : SystemMessageSet[MessageName]) : boolean 
    {
        const functName = _.camelCase(this.options?.messageHandlerPrefix + messageName);

        // @todo This is annoying, what is the right way to do this dynamic call in TS?
        // @ts-ignore
        return (typeof this[functName] == 'function') ? this[functName](message) : true;
    }

    /**
     * Handler for all bus messages, 
     */
    protected busMessageHandler(messageName : string , message : any)
    {
        if (!isSystemMessage(message) || !isSystemMessageName(message.name)) {
            return;
        }
        
        if (message.source && message.source === "Port") {
            // don't echo port messages back to the port
            return;
        }
        
        this.controlWorker.sendMessage(message.name, message);
    }


}

export default OverlayController;

injected(OverlayController, OVERLAY_TOKENS.controlWorker);