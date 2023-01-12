import { PortMessage, SystemMessageCallback, PortMessageOrEvent, SystemMessage, SystemMessageNames, SystemMessages } from "Shared/MessageHandling";

import { IPortMessageAdapter } from "Infrastructure";
import { ExternalConnectionStatus } from "./Types";
import { CheckedDefinitionList, isSystemMessage } from "../../Shared";

export default class PortMessageAdapter implements IPortMessageAdapter
{
    protected autoConnect : boolean = false;
    protected workerPort? : MessagePort;
    protected portMessageCallback? : SystemMessageCallback;

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

    public setPort(workerPort : MessagePort | undefined ) : void {

        if (this.workerPort) {
            this.closePort();
        }

        this.workerPort = workerPort;

        if (workerPort !== undefined) {
            workerPort.addEventListener('message', this.portMessageHandler);
        }

        if (this.autoConnect === true) {
            this.connect();
        }

    }

    public setCallback(callback : SystemMessageCallback | undefined) : void 
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
    public sendMessage(messageName : SystemMessageNames, message : SystemMessages[typeof messageName]) : void
    {
        if (!this.workerPort) {
            console.warn('Attempting to send a worker port message before a port has been supplied', {
                messageName: messageName,
                message : message
            });

            return;
        }

        message.source = 'Port';

        this.workerPort.postMessage(message);
    }


    private portMessageHandler(portMessage : PortMessageOrEvent) : void 
    {
        if (!this.portMessageCallback) {
            console.warn('Port message received before a portMessageCallback has been supplied', portMessage);

            return;
        }
        
        if (!isSystemMessage(portMessage)) {
            return;
        }

        if (!portMessage.name) {
            return;
        }

        this.portMessageCallback(portMessage.name, portMessage);
    }

}