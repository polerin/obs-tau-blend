import { SystemMessageSet, SystemMessage, SystemMessageNames, CollectedSystemMessageNames } from "Shared/MessageHandling"


/**
 * Attempt to check if a message is one of the defined system messages
 * 
 * This is NOT a perfect typecheck
 */
export function isSystemMessage(message : unknown) : message is SystemMessage
{
    const name = (message as SystemMessage).name;

    if (!isSystemMessageName(name)) { 
        return false;
    }

    // good as we can get for now boo typescript
    return (typeof (message as SystemMessageSet[typeof name]).type === "string");
}

export function isSystemMessageName(name : any) : name is SystemMessageNames
{
    return ((typeof name === "string") && CollectedSystemMessageNames.includes(name));
}