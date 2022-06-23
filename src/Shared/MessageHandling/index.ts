import { ObsMessageSet, ObsMessages } from "./MessageMapping/ObsEvents";
import { ObsRequestSet, ObsRequests } from "./MessageMapping/ObsRequests";
import { TwitchChatMessageSet, TwitchChatMessages } from "./MessageMapping/TwitchChat";
import { TwitchEventMessageSet, TwitchEventMessages } from "./MessageMapping/TwitchEvents";
import { AppControlMessageSet, AppControlMessages } from "./MessageMapping/AppControl";
import { AppOverlayMessageSet, AppOverlayMessages } from "./MessageMapping/AppOverlay";

export interface SystemMessageSet extends 
    ObsMessageSet,
    ObsRequestSet,
    TwitchChatMessageSet,
    TwitchEventMessageSet,
    AppControlMessageSet,
    AppOverlayMessageSet
    {};

export type SystemMessage = SystemMessageSet[keyof SystemMessageSet];
export type SystemMessageNames = keyof SystemMessageSet;
export type SystemMessageOrEvent = SystemMessage | Event;
export type SystemMessageCallback = <MessageName extends SystemMessageNames>(messageName : MessageName, message : SystemMessageSet[MessageName]) => void;

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
export type PortMessageCallback = <MessageName extends SystemMessageNames>(messageName : MessageName, message : SystemMessageSet[MessageName]) => void;

const CollectedSystemMessageNames : string[] = Object.values({
    ...ObsMessages,
    ...ObsRequests,
    ...TwitchChatMessages,
    ...TwitchEventMessages,
    ...AppControlMessages,
    ...AppOverlayMessages
});

// Re-export for ease of use
export {
    CollectedSystemMessageNames,
    ObsMessages,
    ObsRequests,
    TwitchChatMessages,
    TwitchEventMessages,
    AppControlMessages,
    AppOverlayMessages
};
