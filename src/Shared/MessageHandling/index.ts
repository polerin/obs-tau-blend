import { ObsEventSet, ObsEvents } from "./ObsEvents";
import { ObsResponseSet, ObsResponses } from "./ObsResponses";
import { ObsRequestSet, ObsRequests } from "./ObsRequests";
import { TwitchChatMessageSet, TwitchChatMessages } from "./TwitchChat";
import { TwitchEventMessageSet, TwitchEventMessages } from "./TwitchEvents";
import { AppControlMessageSet, AppControlMessages } from "./AppControl";
import { AppOverlayMessageSet, AppOverlayMessages } from "./AppOverlay";
import {
  CheckedDefinitionList,
  SystemMessageBase,
  SystemMessageDefinitionList,
} from "Shared/Definitions/Types";

export type FrameworkMessageSet = ObsEventSet &
  ObsRequestSet &
  ObsResponseSet &
  TwitchChatMessageSet &
  TwitchEventMessageSet &
  AppControlMessageSet &
  AppOverlayMessageSet;

export type FrameworkMessage = FrameworkMessageSet[keyof FrameworkMessageSet];
export type SystemMessageSet = { [name: string]: SystemMessageBase };
export type FrameworkMessageNames = keyof FrameworkMessageSet;
export type SystemMessageCallback<
  MessageSet extends SystemMessageDefinitionList,
  MessageName extends keyof MessageSet = keyof MessageSet
> = (messageName: MessageName, message: MessageSet[MessageName]) => void;

/**
 * PortMessages are distinct from SystemMessages, in that they are containers that help
 * transport SystemMessages across the port boundry.  Those messages are placed in the
 * `data` property
 */
export type PortMessage<MessageName extends FrameworkMessageNames | any> = {
  type: "portMessage";
  name: MessageName;
  data: MessageName extends FrameworkMessageNames ? FrameworkMessage : any;
};

export type PortMessageOrEvent = PortMessage<any> | MessageEvent;

// This is currently idential to SystemMessageCallback.. unneeded?
export type PortMessageCallback = <
  MessageSet extends CheckedDefinitionList<any, any>,
  MessageName extends keyof MessageSet
>(
  messageName: MessageName,
  message: MessageSet[typeof messageName]
) => void;

const CollectedSystemMessageNames: string[] = Object.values({
  ...ObsEvents,
  ...ObsRequests,
  ...ObsResponses,
  ...TwitchChatMessages,
  ...TwitchEventMessages,
  ...AppControlMessages,
  ...AppOverlayMessages,
});

// Re-export for ease of use
export {
  CollectedSystemMessageNames,
  ObsEvents,
  ObsEventSet,
  ObsRequests,
  ObsRequestSet,
  ObsResponses,
  ObsResponseSet,
  TwitchChatMessages,
  TwitchEventMessages,
  AppControlMessages,
  AppOverlayMessages,
};
