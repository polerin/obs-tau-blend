import { IServiceAdapter } from "Infrastructure/Interfaces/IServiceAdapter";
import { SystemMessageCallback } from "Shared/MessageHandling";
import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";

export default interface ITauConnector extends IServiceAdapter<SystemMessageCallback>
{
    connect() : Promise<boolean>;

    getStatus() : ExternalConnectionStatus;
}