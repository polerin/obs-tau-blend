import { PortMessage, PortMessageCallback, PortMessageOrEvent, SystemMessage, SystemMessageNames } from "Shared/MessageHandling";
import { AppMessageSet } from "Shared/MessageHandling";

import IPortMessageAdapter from "Infrastructure/Interfaces/IPortMessageAdapter";

export default class PortMessageAdapter implements IPortMessageAdapter 
{
    protected workerPort? : MessagePort | null;
    protected portMessageCallback? : PortMessageCallback | null;

    public constructor() 
    {
        this.portMessageHandler = this.portMessageHandler.bind(this);
    }

    public setPort(workerPort : MessagePort | null ) : void {

        if (this.workerPort) {
            this.closePort();
        }

        if (workerPort !== null) {
            workerPort.addEventListener('message', this.portMessageHandler);
            workerPort.start();
        }

        this.workerPort = workerPort;
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

    /**
     * Send a SystemMessage over the worker port
     */
    public sendMessage<MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) : void
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

    private castToSystemMessage<MessageName extends keyof AppMessageSet>(
        messageName : MessageName,
        message : AppMessageSet[MessageName]
    ) : AppMessageSet[MessageName]
    {
        message.name = messageName;
        return message;
    }

    private castToPortMessage<MessageName extends keyof AppMessageSet>(
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