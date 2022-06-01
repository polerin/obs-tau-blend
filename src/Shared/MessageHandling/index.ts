import { ObsMessageSet, ObsMessages } from "./MessageMapping/ObsEvents";
import { TwitchChatMessageSet, TwitchChatMessages } from "./MessageMapping/TwitchChat";
import { AppControlMessageSet, AppControlMessages } from "./MessageMapping/AppControl";

export interface AppMessageSet extends 
    ObsMessageSet,
    TwitchChatMessageSet,
    AppControlMessageSet
    {};

export type SystemMessage = AppMessageSet[keyof AppMessageSet];
export type SystemMessageNames = keyof AppMessageSet;
export type SystemMessageOrEvent = SystemMessage | Event;
export type SystemMessageCallback<MessageName extends SystemMessageNames> = (messageName : MessageName, message? : AppMessageSet[MessageName]) => void;


export type SystemMessageCallbackDefinition<MessageName extends SystemMessageNames> = {
    name : MessageName,
    callback : SystemMessageCallback<MessageName>
};


// @TODO This *REALLY* does not belong here
export function bindSystemMessageCallbacks(callbackDefs : SystemMessageCallbackDefinition<any>[], context : any) : SystemMessageCallbackDefinition<any>[]
{
    for (const def of callbackDefs) {
        def.callback = def.callback.bind(context);
    }

    return callbackDefs;
}

/**
 * PortMessages are distinct from SystemMessages, in that they are containers that help
 * transport SystemMessages across the port boundry.  Those messages are placed in the
 * `data` property
 */
export type PortMessage<MessageName extends SystemMessageNames | any> = {
    type : 'portMessage',
    name : MessageName,
    data : MessageName extends SystemMessageNames ? SystemMessage : any
};

export type PortMessageOrEvent = PortMessage<any> | MessageEvent;
export type PortMessageCallback = <MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) => void;


// Re-export for ease of use
export {
    ObsMessages,
    TwitchChatMessages,
    AppControlMessages
};
