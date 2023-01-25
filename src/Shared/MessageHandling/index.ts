import { ObsEvent, ObsEventMessages } from "#shared/MessageHandling/ObsEvents";
import { ObsRequest, ObsRequestMessages } from "#shared/MessageHandling/ObsRequests";
import { ObsResponse, ObsResponseMessages } from "#shared/MessageHandling/ObsResponses";
import { TwitchChat, TwitchChatMessages } from "#shared/MessageHandling/TwitchChat";
import { TwitchEvent, TwitchEventMessages } from "#shared/MessageHandling/TwitchEvents";
import { AppControl, AppControlMessages } from "#shared/MessageHandling/AppControl";
import { AppOverlay, AppOverlayMessages } from "#shared/MessageHandling/AppOverlay";

export interface SystemMessages extends ObsEventMessages,  ObsRequestMessages, ObsResponseMessages, TwitchChatMessages, TwitchEventMessages, AppControlMessages, AppOverlayMessages {};

export type SystemMessage = SystemMessages[keyof SystemMessages];
export type SystemMessageNames = keyof SystemMessages;
export type SystemBusMessages = {
  [messageName in keyof SystemMessages]: [SystemMessages[messageName]];
};
export type SystemMessageByName<Name extends SystemMessageNames> = SystemMessages[Name];
export type SystemMessageCallback = (messageName: SystemMessageNames, message: SystemMessages[typeof messageName]) => void;

/**
 * PortMessages are distinct from SystemMessages, in that they are containers that help
 * transport SystemMessages across the port boundry.  Those messages are placed in the
 * `data` property
 */
export type PortMessage<MessageName extends SystemMessageNames> = {
  type: "portMessage";
  name: MessageName;
  data: MessageName extends SystemMessageNames ? SystemMessage : any;
};

export type PortMessageOrEvent = PortMessage<any> | MessageEvent;

// Re-export for ease of use
export {
  ObsEvent,
  ObsRequest,
  ObsResponse,
  TwitchChat,
  TwitchEvent,
  AppControl,
  AppOverlay
};
