import { ExternalConnectionStatus } from "#infra";
import { ControlMessage } from "#shared/Definitions/Types";

export const AppControl = {
  ControlOnline: "app.control.online",
  ControlOffline: "app.control.offline",
  SystemStatus: "app.system.status",
} as const;

export interface AppControlMessages {
  [AppControl.ControlOnline]: ControlMessage & {
    name: typeof AppControl.ControlOnline;
  };

  [AppControl.ControlOffline]: ControlMessage & {
    name: typeof AppControl.ControlOffline;
  };

  [AppControl.SystemStatus]: ControlMessage & {
    name: typeof AppControl.SystemStatus;
    serviceStatuses: ExternalConnectionStatus[];
  };
}
