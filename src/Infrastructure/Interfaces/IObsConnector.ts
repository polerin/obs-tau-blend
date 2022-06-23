import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";
import { SystemMessageSet, SystemMessageCallback, SystemMessageNames } from "Shared/MessageHandling";
import IServiceAdapter from "./IServiceAdapter";

export default interface IObsConnector extends IServiceAdapter<SystemMessageCallback, SystemMessageSet>
{
    connect() : Promise<boolean>;

    getStatus() : ExternalConnectionStatus;
}