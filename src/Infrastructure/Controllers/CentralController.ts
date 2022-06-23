import _  from "lodash";

import { CENTRAL_TOKENS , injected, SHARED_TOKENS} from "Bindings";

import { publish } from "Infrastructure/Shared/TypedPubsub";

import PortMessageAdapter from "Infrastructure/Shared/PortMessageAdapter";
import { SystemMessageNames, SystemMessageSet } from "Shared/MessageHandling";
import { AppControlMessages, AppOverlayMessages } from "Shared/MessageHandling";
import IServiceAdapter from "Infrastructure/Interfaces/IServiceAdapter";


export default class CentralController
{
    private serviceAdapters : IServiceAdapter<unknown, SystemMessageSet>[];
    private portMessageAdapter : PortMessageAdapter;

    protected defaultOptions : object = {
        messageHandlerPrefix : "message_"
    };

    protected options? : any;

    constructor(serviceAdapters: IServiceAdapter<unknown, SystemMessageSet>[], portMessageAdapter : PortMessageAdapter) 
    {
        this.serviceAdapters = serviceAdapters;
        this.portMessageAdapter = portMessageAdapter;

        this.portMessageHandler = this.portMessageHandler.bind(this);
        this.adapterMessageHandler = this.adapterMessageHandler.bind(this);
        this.onSharedWorkerConnect = this.onSharedWorkerConnect.bind(this);

    }

    public async init(options : object) : Promise<void>
    {
        this.options = {...this.defaultOptions, ...options};

        this.registerListeners();

        await this.connectAdapters();

        this.sendSystemStatusMessage();
    }

    public connectAdapters() : Promise<boolean[]>
    {
        const connectionPromises : Array<Promise<boolean>> = this.serviceAdapters.map((adapter) => adapter.connect());

        return Promise.all(connectionPromises);
    }

    public onSharedWorkerConnect(message : MessageEvent<any>) : void 
    {
        console.debug("Central controller port activated");
        this.portMessageAdapter.setPort(message.ports[0]);
        this.portMessageAdapter.connect();
    }

    protected portMessageHandler<MessageName extends SystemMessageNames>(messageName : MessageName, message : SystemMessageSet[MessageName]) : void
    {
        console.debug("Port message received by central control", {
            messageName : messageName,
            message : message
        });

        message.source = "Port";

        // if the message handler returns true (or no message handler) publish the message on the bus
        if (this.callMessageHandler(messageName, message)) {
            console.log("Publishing port message", messageName, message);
            publish(messageName, message);
        }
    }

    protected adapterMessageHandler<MessageName extends SystemMessageNames>(messageName : MessageName, message : SystemMessageSet[MessageName]) : void 
    {
        console.debug("Service message received by central control", message);      

        if (message.source && message.source === "Port") {
            // don't echo port messages back
            return;
        }

        // if the message handler returns true (or no message handler) publish the message on the bus
        if (this.callMessageHandler(messageName, message)) {
            publish(messageName, message);
            this.portMessageAdapter.sendMessage(messageName, message);
        }
    }

    // @todo move this to the DynamicMethodCall mixin/decorator
    // Also do this in the OverlayController
    protected callMessageHandler<MessageName extends SystemMessageNames>(messageName : MessageName, message : SystemMessageSet[MessageName]) : boolean 
    {
        const functName = _.camelCase(this.options?.messageHandlerPrefix + messageName);

        // @todo This is annoying, what is the right way to do this dynamic call in TS?
        // @ts-ignore
        return (typeof this[functName] == 'function') ? this[functName](message) : true;
    }


    protected sendSystemStatusMessage() : void 
    {
        console.debug("Sending system status");
        this.portMessageAdapter.sendMessage(AppControlMessages.SystemStatus, {
                type : 'controlMessage',
                name : AppControlMessages.SystemStatus,
                serviceStatuses: this.serviceAdapters.map((adapter) => adapter.getStatus())
        });
    }

    protected registerListeners()
    {
        this.portMessageAdapter.setCallback(this.portMessageHandler);

        for (const adapter of this.serviceAdapters) {
            adapter.setCallback(this.adapterMessageHandler);
        }
    }

    protected removeListeners()
    {
        this.portMessageAdapter.setCallback(null);
        this.serviceAdapters.forEach((adapter) => adapter.setCallback(null));
    }

    protected messageAppControlOverlayOnline(message : SystemMessageSet[typeof AppOverlayMessages.OverlayOnline]) : boolean 
    {
        this.sendSystemStatusMessage();

        return false;
    }
}

injected(CentralController, CENTRAL_TOKENS.serviceAdapters, SHARED_TOKENS.portMessageAdapter);