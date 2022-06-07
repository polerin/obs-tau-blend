import _  from "lodash";

import { CENTRAL_TOKENS , injected, SHARED_TOKENS} from "Bindings";

import { publish } from "Infrastructure/Shared/TypedPubsub";
import { DynamicMethodCall } from "Infrastructure/Shared/Mixins";


import IObsConnector from "Infrastructure/Interfaces/IObsConnector";
import PortMessageAdapter from "Infrastructure/Shared/PortMessageAdapter";
import { SystemMessage, SystemMessageNames, AppMessageSet } from "Shared/MessageHandling";
import { AppControlMessages, AppOverlayMessages } from "Shared/MessageHandling";


export default class CentralController
{
    private obsConnector : IObsConnector;
    private sharedWorkerPort? : MessagePort;
    private portMessageAdapter : PortMessageAdapter;

    protected defaultOptions : object = {
        messageHandlerPrefix : "message_"
    };

    protected options? : any;

    constructor(obsConnector : IObsConnector, portMessageAdapter : PortMessageAdapter) 
    {
        this.obsConnector = obsConnector;
        this.portMessageAdapter = portMessageAdapter;

        this.portMessageHandler = this.portMessageHandler.bind(this);
        this.serviceMessageHandler = this.serviceMessageHandler.bind(this);
        this.onSharedWorkerConnect = this.onSharedWorkerConnect.bind(this);

    }

    public async init(options : object) : Promise<void>
    {
        this.options = {...this.defaultOptions, ...options};

        this.registerListeners();

        await this.obsConnector.connect();

        this.sendSystemStatusMessage();
        // Connect TAU/Etc
    }

    public onSharedWorkerConnect(message : MessageEvent<any>) : void 
    {
        this.portMessageAdapter.setPort(message.ports[0]);
    }

    protected portMessageHandler<MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) : void
    {
        console.debug("Port message received by central control", {
            messageName : messageName,
            message : message
        });

        // if the message handler returns true (or no message handler) publish the message on the bus
        if (this.callMessageHandler(messageName, message)) {
            publish(messageName, message);
        }
    }

    protected serviceMessageHandler<MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) : void 
    {
        console.debug("Service message received by central control", message);      

        // if the message handler returns true (or no message handler) publish the message on the bus
        if (this.callMessageHandler(messageName, message)) {
            publish(messageName, message);
            this.portMessageAdapter.sendMessage(messageName, message);
        }
    }

    // @todo move this to the DynamicMethodCall mixin/decorator
    // Also do this in the OverlayController
    protected callMessageHandler<MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) : boolean 
    {
        const functName = _.camelCase(this.options?.messageHandlerPrefix + messageName);

        // @todo This is annoying, what is the right way to do this dynamic call in TS?
        // @ts-ignore
        return (typeof this[functName] == 'function') ? this[functName](message) : true;
    }


    protected sendSystemStatusMessage() : void 
    {
        console.debug("Sending system status");
        this.portMessageAdapter.sendMessage(AppControlMessages.SystemStaus, {
                type : 'controlMessage',
                name : AppControlMessages.SystemStaus,
                obsStatus: this.obsConnector.getStatus()
        });
    }

    protected registerListeners()
    {
        this.portMessageAdapter.setCallback(this.portMessageHandler);
        this.obsConnector.setCallback(this.serviceMessageHandler);
    }

    protected removeListeners()
    {
        this.portMessageAdapter.setCallback(null);
        this.obsConnector.setCallback(null);
    }

    protected messageAppControlOverlayOnline(message : AppMessageSet[typeof AppOverlayMessages.OverlayOnline]) : boolean 
    {
        console.log("yup we see the overlay online!");
        this.sendSystemStatusMessage();

        return false;
    }
}

injected(CentralController, CENTRAL_TOKENS.obsConnector, SHARED_TOKENS.portMessageAdapter);