import _ from "lodash";

import { SystemMessage, SystemMessageNames, SystemMessages, AppOverlay, SystemMessageByName } from "Shared/MessageHandling";
import { isSystemMessage } from "Shared/Utility/Message";

import IOverlayComponent from "Shared/Interfaces/IOverlayCompoenent";
import { IControlWorker } from "../../Infrastructure";
import { DebugContainer } from "Overlay/Components";
import { TypedPubSubBus } from "Infrastructure/Shared";


export default class OverlayController {
    private defaultOptions : object = {
        'targetSelector': ".overlay-container",
        'debugSelector' : "debug-container",
        'componentMaps' : {}
    };

    private options : any = {};
    private container?: HTMLElement;
    private debugContainer? : DebugContainer;

    constructor(private controlWorker: IControlWorker, private eventBus: TypedPubSubBus)
    {
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
        this.eventBus.subscribe('*', this.busMessageHandler);

        this.controlWorker.sendMessage(AppOverlay.OverlayOnline, {
            type: "controlMessage",
            name: AppOverlay.OverlayOnline
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

    protected portMessageHandler(messageName : SystemMessageNames, message : SystemMessageByName<typeof messageName>) : void
    {
        if (!isSystemMessage(message)) {
            console.warn("Received non-system message on port", )
            return;
        }

        console.log("Received port message on overlay: ", message);
        if (this.debugContainer) {
            const debugMessage =`${message.type} : ${message.name} : ${JSON.stringify(message)}`;
            this.debugContainer?.addMessage(debugMessage);
        }

        message.source = "Port";

        // if message handler returns true or no handler, publish message
        if(this.callMessageHandler(messageName, message)) {
            this.eventBus.publish(messageName, message);
        }
    }

    // @todo move this to the DynamicMethodCall mixin/decorator
    // Also implement in CentralController
    protected callMessageHandler(messageName : SystemMessageNames, message : SystemMessages[typeof messageName]) : boolean 
    {
        const functName = _.camelCase(this.options?.messageHandlerPrefix + messageName);
        const funct = this[functName as keyof this];

        if (typeof funct !== 'function') {
            return true;
        }

        return funct(message);
    }

    /**
     * Handler for all bus messages, 
     */
    protected busMessageHandler(messageName : SystemMessageNames, message : SystemMessage)
    {
        if (!isSystemMessage(message) || message.name !== messageName) {
            return;
        }

        if (message.source && message.source === "Port") {
            // don't echo port messages back to the port
            return;
        }
        
        this.controlWorker.sendMessage(messageName, message);
    }


}