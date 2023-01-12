import { SystemMessage, SystemMessageByName, SystemMessageNames, SystemMessages } from 'Shared/MessageHandling';

/**
 * Attempt to check if a message is one of the defined system messages
 * 
 * This is NOT a perfect typecheck
 */
export function isSystemMessage(subject : unknown) : subject is SystemMessage
{
    const message = subject as SystemMessage;

    if (!(
        'name' in message
        && typeof message['name'] === 'string'
        && 'type' in message
        && typeof message['type'] === 'string'
        && 'source' in message
        && typeof message['source'] === 'string'
    )) { 
        return false;
    }

    // good as we can get for now boo typescript
    return true;
}


export function coerceMessageType<MessageName extends SystemMessageNames>(messageName: SystemMessageNames, subject: unknown): SystemMessages[MessageName] | undefined{
    const message = subject as SystemMessageByName<MessageName>;

    if (message.name !== messageName) {
        return undefined;
    }

    return message;
}