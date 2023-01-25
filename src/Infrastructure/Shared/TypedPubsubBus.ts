import {
  publish,
  subscribe,
  unsubscribe,
} from "pubsub-js";
import { isSystemMessage, SystemMessageCallback, SystemMessageNames, SystemMessages } from "#shared";

/**
 * Singleton facade to enforce typing for pubsub.js calls
 * 
 * !!! This is a sneaky singleton because of the way pubsub is structured
 */
export default class TypedPubSubBus {
  public publish(messageName: SystemMessageNames, message: SystemMessages[SystemMessageNames]): boolean {
    return publish(messageName, message);
  }

  public subscribe<MessageName extends SystemMessageNames | string>(
    messageName: MessageName,
    listener: SystemMessageCallback
  ): PubSubJS.Token {
    return subscribe(messageName, (incomingName: string, data?: unknown) => {
      const name = incomingName as SystemMessageNames;

      if (!name || !data) {
        return;
      }

      if (isSystemMessage(data)) {
        listener(name, data);
      }
    });
  }

  public unsubscribe = unsubscribe;
}
