import _ from "lodash";
import { SystemMessage, SystemMessageNames } from "#shared";
import { TypedPubSubBus } from "#infra/Shared/index";

export default abstract class AbstractController {

  protected messageHandlerPrefix: string = "_message";

  public constructor(protected eventBus: TypedPubSubBus) {}

  protected callMessageHandler(
    messageName: SystemMessageNames,
    message: SystemMessage
  ): boolean {
    const functName = _.camelCase(
      this.messageHandlerPrefix + messageName
    );
    const funct = this[functName as keyof this];

    if (typeof funct !== "function") {
      return true;
    }

    return funct(message);
  }

  protected portMessageHandler = (
    messageName: SystemMessageNames,
    message: SystemMessage
  ): void => {
    message.source = "Port";

    console.log("in port message handler");
    // if the message handler returns true (or no message handler) publish the message on the bus
    if (this.callMessageHandler(messageName, message)) {
      console.log("Publishing port message", messageName, message);
      this.eventBus.publish(messageName, message);
    }
  };
}
