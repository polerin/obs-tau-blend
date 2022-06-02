import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";
import { SystemMessageCallback, SystemMessageNames } from "Shared/MessageHandling";
import { IServiceAdapter } from "./IServiceAdapter";

export default interface IObsConnector extends IServiceAdapter<SystemMessageCallback>
{
    connect() : Promise<boolean>;

    getStatus() : ExternalConnectionStatus;
}