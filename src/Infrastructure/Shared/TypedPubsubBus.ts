import {
  publish,
  subscribe,
  unsubscribe,
} from "pubsub-js";
import { CheckedDefinitionList, SystemMessageCallback } from "Shared";
import {
  FrameworkMessageSet,
  FrameworkMessageNames,
} from "Shared/MessageHandling";

/**
 * Singleton facade to enforce typing for pubsub.js calls
 * 
 * !!! This is a sneaky singleton because of the way pubsub is structured
 */
export default class TypedPubSubBus<
  MessageSet extends CheckedDefinitionList<any, any> = FrameworkMessageSet,
  MessageName extends keyof MessageSet & string = keyof MessageSet & string
> {
  public publish(messageName: MessageName, message: MessageSet[MessageName]): boolean {
    return publish(messageName, message);
  }

  public subscribe(
    messageName: MessageName,
    listener: SystemMessageCallback<MessageSet, MessageName>
  ): PubSubJS.Token {
    return subscribe(messageName, (incomingName: string, data?: any) => {
      const name = incomingName as FrameworkMessageNames;

      if (!name || !data) {
        return;
      }

      const message = data as MessageSet[MessageName];

      if (message.type) {
        listener(messageName, message);
      }
    });
  }

  public unsubscribe = unsubscribe;
}
