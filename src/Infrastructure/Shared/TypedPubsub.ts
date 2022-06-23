import { publish as basePublish, subscribe as baseSubscribe, unsubscribe as baseUnsubscribe } from "pubsub-js";
import { SystemMessageSet, SystemMessageCallback, SystemMessageNames } from "Shared/MessageHandling";

export function publish<MessageName extends SystemMessageNames>(messageName : MessageName, message : SystemMessageSet[MessageName]) : boolean
{
    return basePublish(messageName, message);
}

export function subscribe<MessageName extends SystemMessageNames>(messageName : MessageName, listener : SystemMessageCallback) : PubSubJS.Token 
{
    return baseSubscribe(messageName, (incomingName: string, data? : any) => {
        const name = incomingName as SystemMessageNames; 

        if (!name || !data) {
            return;
        }

        const message = data as SystemMessageSet[MessageName];

        if (message.type) {
            listener(messageName, message)
        }
    });
}

export const unsubscribe = baseUnsubscribe;