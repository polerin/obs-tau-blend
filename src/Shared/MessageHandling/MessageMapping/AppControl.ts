import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";
import { ControlMessage } from "Shared/Types";

export const AppControlMessages = {
    ControlOnline : "app.control.online",
    ControlOffline : "app.control.offline",
    SystemStatus : "app.system.status"
} as const;


export interface AppControlMessageSet {
    [AppControlMessages.ControlOnline] : ControlMessage;
    [AppControlMessages.ControlOffline] : ControlMessage;
    [AppControlMessages.SystemStatus] : ControlMessage & {
        name : typeof AppControlMessages.SystemStatus,
        serviceStatuses : ExternalConnectionStatus[]
    }
}