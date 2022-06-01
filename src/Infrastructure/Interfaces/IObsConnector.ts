import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";

export default interface IObsConnector
{
    connect() : Promise<boolean>;

    getStatus() : ExternalConnectionStatus;
}