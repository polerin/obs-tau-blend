import { CENTRAL_TOKENS , injected} from "Bindings";

import IObsConnector from "Infrastructure/Interfaces/IObsConnector";

export default class CentralController
{
    private obsConnector : IObsConnector;
    private sharedWorkerPort? : MessagePort;

    protected defaultOptions : any = {
    };

    protected options? : any;

    constructor(obsConnector : IObsConnector) 
    {
        this.obsConnector = obsConnector;
        this.onSharedWorkerConnect = this.onSharedWorkerConnect.bind(this);
        this.sharedWorkerMessageHandler = this.sharedWorkerMessageHandler.bind(this);
    }

    public init(options : any)
    {
        this.options = {...this.defaultOptions, ...options};
        
        if (!this.obsConnector.connect()) {
            console.log("Unable to connect to obs");
        }
    }

    public onSharedWorkerConnect(message : MessageEvent<any>) : void 
    {
        this.sharedWorkerPort = message.ports[0];
        this.sharedWorkerPort.addEventListener('message', this.sharedWorkerMessageHandler);
        this.sharedWorkerPort.start();
    
        console.log("Central Command Connected", message);
    }

    protected sharedWorkerMessageHandler(message : MessageEvent<any>)
    {
        const returnMessage = "Reply from Worker: " + message.data;
        this.sharedWorkerPort?.postMessage(returnMessage);
    }
}

injected(CentralController, CENTRAL_TOKENS.obsConnector);