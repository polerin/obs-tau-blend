import IPortMessageAdapter from "./IPortMessageAdapter";

export default interface IControlWorker extends IPortMessageAdapter
{
    connect() : Promise<boolean>;
    disconnect() : void;
}