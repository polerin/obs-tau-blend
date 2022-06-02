import { ObsMessageSet, ObsMessages } from "./MessageMapping/ObsEvents";
import { TwitchChatMessageSet, TwitchChatMessages } from "./MessageMapping/TwitchChat";
import { AppControlMessageSet, AppControlMessages } from "./MessageMapping/AppControl";
import { AppOverlayMessageSet, AppOverlayMessages } from "./MessageMapping/AppOverlay";

export interface AppMessageSet extends 
    ObsMessageSet,
    TwitchChatMessageSet,
    AppControlMessageSet,
    AppOverlayMessageSet
    {};

export type SystemMessage = AppMessageSet[keyof AppMessageSet];
export type SystemMessageNames = keyof AppMessageSet;
export type SystemMessageOrEvent = SystemMessage | Event;
export type SystemMessageCallback = <MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) => void;

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

// This is currently idential to SystemMessageCallback.. unneeded?
export type PortMessageCallback = <MessageName extends SystemMessageNames>(messageName : MessageName, message : AppMessageSet[MessageName]) => void;


// Re-export for ease of use
export {
    ObsMessages,
    TwitchChatMessages,
    AppControlMessages,
    AppOverlayMessages
};
