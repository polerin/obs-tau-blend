import { publish as basePublish, subscribe as baseSubscribe } from "pubsub-js";
import { AppMessageSet, SystemMessageCallback, SystemMessageNames } from "Shared/MessageHandling";

export function publish<MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) : boolean
{
    return basePublish(messageName, message);
}

export function subscribe<MessageName extends SystemMessageNames>(messageName : MessageName, listener : SystemMessageCallback<MessageName>) : PubSubJS.Token 
{
    return baseSubscribe(messageName, (incomingName: string, data? : any) => {
        const name = incomingName as SystemMessageNames; 

        if (!name || !data) {
            return;
        }

        const message = data as AppMessageSet[MessageName];

        if (message.type) {
            listener(messageName, message)
        }
    });
}