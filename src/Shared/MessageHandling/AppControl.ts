import { ExternalConnectionStatus } from "Infrastructure/Shared/Types";
import {
  ControlMessage,
} from "Shared/Definitions/Types";

export const AppControl = {
  ControlOnline: "app.control.online",
  ControlOffline: "app.control.offline",
  SystemStatus: "app.system.status",
} as const;

export interface AppControlMessages {
  [AppControl.ControlOnline]: ControlMessage;
  [AppControl.ControlOffline]: ControlMessage;
  [AppControl.SystemStatus]: ControlMessage & {
    serviceStatuses: ExternalConnectionStatus[];
  };
}
