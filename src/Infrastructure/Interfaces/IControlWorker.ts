import { ControlMessage } from "Infrastructure/Shared/Types";

export default interface IControlWorker extends EventTarget
{
    connect() : void;
    disconnect() : void;

    dispatch(message : ControlMessage) : boolean;

    dispatchMessage(label : string, messageData : any) : void
}