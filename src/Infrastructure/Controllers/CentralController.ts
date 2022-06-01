import { CENTRAL_TOKENS , injected, SHARED_TOKENS} from "Bindings";
import { publish, subscribe } from "pubsub-js";

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

        this.onSharedWorkerConnect = this.onSharedWorkerConnect.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.portMessageHandler = this.portMessageHandler.bind(this);

        this.portMessageAdapter.setCallback(this.portMessageHandler);
    }

    public async init(options : any) : Promise<void>
    {
        this.options = {...this.defaultOptions, ...options};

        this.registerListeners();

        const obsConnected : boolean = await this.obsConnector.connect();

        if (!obsConnected) {
            console.log("Unable to connect to obs");
        } else {
            console.log("Connected to OBS!");
        }

        // Connect TAU/Etc
    }

    public onSharedWorkerConnect(message : MessageEvent<any>) : void 
    {
        this.portMessageAdapter.setPort(message.ports[0]);

        this.sendSystemStatusMessage();
    }

    protected portMessageHandler<MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) : void {
        console.debug("Message received by central control", {
            messageName : messageName,
            message : message
        });
    }

    protected sendSystemStatusMessage() : void 
    {
        this.portMessageAdapter.sendMessage(AppControlMessages.SystemStaus, {
                type : 'controlMessage',
                name : AppControlMessages.SystemStaus,
                obsStatus: this.obsConnector.getStatus()
        });
    }

    protected sendMessage<MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) : void
    {
        if (!this.sharedWorkerPort) {
            return;
        }

        this.sharedWorkerPort?.postMessage(message);
    }

    protected registerListeners()
    {
    }

    protected removeListeners()
    {

    }
}

injected(CentralController, CENTRAL_TOKENS.obsConnector, SHARED_TOKENS.portMessageAdapter);