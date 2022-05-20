import { omit } from "lodash";

import { OVERLAY_TOKENS, injected } from "Bindings";

import IControlWorker from "Infrastructure/Interfaces/IControlWorker";
import { ControlMessage, ControlRequest } from "Infrastructure/Shared/Types";

export default class ControlWorker extends EventTarget implements IControlWorker
{
    private sharedWorker : SharedWorker;

    constructor(sharedWorker : SharedWorker)
    {
        super();
        this.sharedWorker = sharedWorker;
    }

    public connect() 
    {
        if (!this.sharedWorker) {
            return;
        }

        this.portMessageHandler = this.portMessageHandler.bind(this);
        this.sharedWorker.port.addEventListener('message', this.portMessageHandler);
        this.sharedWorker.port.start();
        
        this.sharedWorker.port.postMessage("test message from ControlWorker"); 
    }

    public disconnect()
    {
        if (this.sharedWorker) {
            this.sharedWorker.port.removeEventListener('message', this.portMessageHandler);
            this.sharedWorker.port.close();
        }
    }

    public dispatchMessage(label : string, messageData : any) : void
    {
        const request : ControlRequest = {
            'type' : 'controlRequest',
            'label' : label,
            'data' : messageData.data
        } 

        this.sharedWorker.port.postMessage(request);
    }

    public dispatchEvent(e: Event & ControlMessage) : boolean {
        return super.dispatchEvent(e);
    }

    public dispatch(e: ControlMessage) : boolean {
        return this.dispatchEvent(<Event & ControlMessage>(Object.assign(new Event(e.type), omit(e, ['type']))));
    }

    public addEventListener<
      T extends ControlMessage['type'],
      E extends ControlMessage & { type: T }
    >(
      type: T,
      listener: EventListenerOrEventListenerObject)
    {
      super.addEventListener(type, listener);
    }
  
    public removeEventListener(type : ControlMessage['type'], listener: EventListenerOrEventListenerObject | null): void {
        super.removeEventListener(type, listener);
    }


    private portMessageHandler(message : MessageEvent) : void 
    {
        const controlMessage : ControlMessage = {
            'type' : 'controlMessage',
            'label' : "portMessage",
            'data' : message.data
        };

        this.dispatch(controlMessage);
    }
}

injected(ControlWorker, OVERLAY_TOKENS.controlSharedWorker);