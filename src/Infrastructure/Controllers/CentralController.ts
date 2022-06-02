import { CENTRAL_TOKENS , injected, SHARED_TOKENS} from "Bindings";

import { publish } from "Infrastructure/Shared/TypedPubsub";

import { SystemMessageNames, AppMessageSet } from "Shared/MessageHandling";

import IObsConnector from "Infrastructure/Interfaces/IObsConnector";
import { AppControlMessages } from "Shared/MessageHandling";
import PortMessageAdapter from "Infrastructure/Shared/PortMessageAdapter";

export default class CentralController
{
    private obsConnector : IObsConnector;
    private sharedWorkerPort? : MessagePort;
    private portMessageAdapter : PortMessageAdapter;

    protected defaultOptions : any = {
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

    public async init(options : any) : Promise<void>
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
        
        publish(messageName, message);
    }

    protected serviceMessageHandler<MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) : void 
    {
        console.debug("Service message received by central control", message);      
        publish(messageName, message);
        this.portMessageAdapter.sendMessage(messageName, message);
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
}

injected(CentralController, CENTRAL_TOKENS.obsConnector, SHARED_TOKENS.portMessageAdapter);