import _ from "lodash";

import { subscribe } from "pubsub-js";

import { AppOverlayMessages, FrameworkMessageSet, SystemMessageSet } from "Shared/MessageHandling";
import { isSystemMessage, isSystemMessageName } from "Shared/Utility/Message";

import IOverlayComponent from "Shared/Interfaces/IOverlayCompoenent";
import { IControlWorker, FrameworkEventBus } from "../../Infrastructure";
import { DebugContainer } from "Overlay/Components";
import { AppOverlayMessageSet } from "Shared/MessageHandling/AppOverlay";


export default abstract class OverlayController<
    MessageSet extends FrameworkMessageSet = FrameworkMessageSet,
    MessageNames extends keyof MessageSet = keyof MessageSet
> {
    private defaultOptions : object = {
        'targetSelector': ".overlay-container",
        'debugSelector' : "debug-container",
        'componentMaps' : {}
    };

    private options : any = {};
    private container?: HTMLElement;
    private debugContainer? : DebugContainer;

    constructor(private controlWorker: IControlWorker<MessageSet>, private eventBus: FrameworkEventBus)
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
        subscribe('*', this.busMessageHandler);

        type foo = FrameworkMessageSet[typeof AppOverlayMessages.OverlayOnline];
        
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

    protected portMessageHandler<MessageName extends MessageNames>(messageName : MessageName, message : MessageSet[MessageName]) : void
    {
        if (!isSystemMessage<MessageSet>(message)) {
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
    protected callMessageHandler<MessageName extends MessageNames>(messageName : MessageName, message : MessageSet[MessageName]) : boolean 
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