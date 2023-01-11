import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";
import { CheckedDefinitionList, ControlMessage } from "Shared/Definitions/Types";

export const AppControlMessages = {
    ControlOnline : "app.control.online",
    ControlOffline : "app.control.offline",
    SystemStatus : "app.system.status"
} as const;


export type AppControlMessageSet = CheckedDefinitionList<
    typeof AppControlMessages,
    {
        [AppControlMessages.ControlOnline] : ControlMessage;
        [AppControlMessages.ControlOffline] : ControlMessage;
        [AppControlMessages.SystemStatus] : ControlMessage & {
            name : typeof AppControlMessages.SystemStatus,
            serviceStatuses : ExternalConnectionStatus[]
        }
    }
>;
