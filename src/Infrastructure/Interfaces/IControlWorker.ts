import IPortMessageAdapter from "#infra/Interfaces/IPortMessageAdapter";

export default interface IControlWorker extends IPortMessageAdapter
{
    connect() : Promise<boolean>;
    disconnect() : void;
}