import { PortMessage, PortMessageCallback, PortMessageOrEvent, FrameworkMessage, FrameworkMessageNames } from "Shared/MessageHandling";

import { IPortMessageAdapter } from "Infrastructure";
import { ExternalConnectionStatus } from "./Types";
import { CheckedDefinitionList } from "../../Shared";

export default class PortMessageAdapter<
    MessageSet extends CheckedDefinitionList<any, any>,
    MessageName extends keyof MessageSet = keyof MessageSet
> implements IPortMessageAdapter<MessageSet>
{
    protected autoConnect : boolean = false;
    protected workerPort? : MessagePort | null;
    protected portMessageCallback? : PortMessageCallback | null;

    public constructor() 
    {
        this.portMessageHandler = this.portMessageHandler.bind(this);
    }


    public get status(): ExternalConnectionStatus {
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
    public sendMessage(messageName : MessageName, message : MessageSet[typeof messageName]) : void
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
        
        const holder = portMessage.data as PortMessage<MessageName>;

        if (!holder.name) {
            return;
        }

        this.portMessageCallback(holder.name, this.castToSystemMessage(holder.name, holder.data));
    }

    private castToSystemMessage(
        messageName : MessageName,
        message : MessageSet[typeof messageName]
    ) : MessageSet[MessageName]
    {
        message.name = messageName;
        return message;
    }

    private castToPortMessage(
        messageName : MessageName,
        message : MessageSet[typeof messageName]
    ) : PortMessage<typeof messageName>
    {
        return <PortMessage<MessageName>>{
            type: 'portMessage',
            name: messageName,
            data: message
        };
    }
}