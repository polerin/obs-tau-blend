import IPortMessageAdapter from "./IPortMessageAdapter";

export default interface IControlWorker extends IPortMessageAdapter
{
    connect() : void;
    disconnect() : void;
}