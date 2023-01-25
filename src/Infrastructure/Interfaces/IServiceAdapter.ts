import { ExternalConnectionStatus } from "#infra/Shared/Types";
import { SystemMessage, SystemMessageCallback, SystemMessageNames } from "#shared";

export default interface IServiceAdapter {
  connect(): Promise<boolean>;

  get status(): ExternalConnectionStatus;

  setCallback(callback: SystemMessageCallback | undefined): void;

  sendMessage(messageName: SystemMessageNames, message: SystemMessage): void;
}
