import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";
import { ControlMessage } from "Shared/Types";

export const AppControlMessages = {
    ControlOnline : "app.control.online",
    ControlOffline : "app.control.offline",
    SystemStaus : "app.system.status"
} as const;


export interface AppControlMessageSet {
    [AppControlMessages.ControlOnline] : ControlMessage;
    [AppControlMessages.ControlOffline] : ControlMessage;
    [AppControlMessages.SystemStaus] : ControlMessage & {
        obsStatus : ExternalConnectionStatus
    }
}