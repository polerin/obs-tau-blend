import { FrameworkMessage, FrameworkMessageNames, SystemMessageSet } from "Shared/MessageHandling";

/**
 * Attempt to check if a message is one of the defined system messages
 * 
 * This is NOT a perfect typecheck
 */
export function isSystemMessage<MessageSet extends SystemMessageSet>(message : unknown) : message is MessageSet[keyof MessageSet]
{
    const name = (message as FrameworkMessage).name;

    if (!isSystemMessageName(name)) { 
        return false;
    }

    // good as we can get for now boo typescript
    return (typeof (message as MessageSet[typeof name]).type === "string");
}

export function isSystemMessageName<MessageSet extends SystemMessageSet>(name : any, MessageNames : (keyof MessageSet)[]) : name is keyof FrameworkMessageNames
{
    return ((typeof name === "string") && MessageNames.includes(name));
}