import { PortMessage, PortMessageCallback, PortMessageOrEvent, SystemMessage, SystemMessageNames } from "Shared/MessageHandling";
import { SystemMessageSet } from "Shared/MessageHandling";

import IPortMessageAdapter from "Infrastructure/Interfaces/IPortMessageAdapter";
import { ExternalConnectionStatus } from "./Types";

export default class PortMessageAdapter implements IPortMessageAdapter 
{
    protected autoConnect : boolean = false;
    protected workerPort? : MessagePort | null;
    protected portMessageCallback? : PortMessageCallback | null;

    public constructor() 
    {
        this.portMessageHandler = this.portMessageHandler.bind(this);
    }


    public getStatus(): ExternalConnectionStatus {
        return {
            serviceName : "controlPort",
            status : (this.workerPort) ? "connected" : "disconnected",
            details : {}
        }
    }

    public setPort(workerPort : MessagePort | null ) : void {

        if (this.workerPort) {
            this.closePort();
        }

        this.workerPort = workerPort;

        if (workerPort !== null) {
            workerPort.addEventListener('message', this.portMessageHandler);
        }

        if (this.autoConnect === true) {
            this.connect();
        }

    }

    public setCallback(callback : PortMessageCallback | null) : void 
    {
        this.portMessageCallback = callback;
    }


    public closePort() : void
    {
        this.workerPort?.close();
        this.workerPort?.removeEventListener('message', this.portMessageHandler);
    }

    public connect() : Promise<boolean>
    {
        if (this.workerPort) {
            this.workerPort.start();
            this.autoConnect = false;

            return Promise.resolve(true);
        }

        this.autoConnect = true;
        return Promise.resolve(false);
    }

    /**
     * Send a SystemMessage over the worker port
     */
    public sendMessage<MessageName extends SystemMessageNames>(messageName : MessageName, message : SystemMessageSet[MessageName]) : void
    {
        if (!this.workerPort) {
            console.warn('Attempting to send a worker port message before a port has been supplied', {
                messageName: messageName,
                message : message
            });

            return;
        }

        this.workerPort.postMessage(this.castToPortMessage(messageName, message));
    }

    private portMessageHandler(portMessage : PortMessageOrEvent) : void 
    {
        if (!this.portMessageCallback) {
            console.warn('Port message received before a portMessageCallback has been supplied', portMessage);

            return;
        }
        
        const holder = portMessage.data as PortMessage<SystemMessageNames>;

        if (!holder.name) {
            return;
        }

        this.portMessageCallback(holder.name, this.castToSystemMessage(holder.name, holder.data));
    }

    private castToSystemMessage<MessageName extends keyof SystemMessageSet>(
        messageName : MessageName,
        message : SystemMessageSet[MessageName]
    ) : SystemMessageSet[MessageName]
    {
        message.name = messageName;
        return message;
    }

    private castToPortMessage<MessageName extends keyof SystemMessageSet>(
        messageName : MessageName,
        message : SystemMessage
    ) : PortMessage<MessageName>
    {
        return <PortMessage<MessageName>>{
            type: 'portMessage',
            name: messageName,
            data: message
        };
    }
}