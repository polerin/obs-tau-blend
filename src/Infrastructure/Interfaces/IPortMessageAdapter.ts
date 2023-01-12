import IServiceAdapter from "./IServiceAdapter";

export default interface IPortMessageAdapter extends IServiceAdapter
{
    setPort(workerPort : MessagePort | undefined) : void;
    closePort() : void;
}