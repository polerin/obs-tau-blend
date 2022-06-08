import { TauEventNames, TauEvents } from "../Definitions/TauEvents";
import { AppMessageSet } from "Shared/MessageHandling";

import { TwitchChatMessages } from "Shared/MessageHandling";

import ITauEventTransformer from "../Interfaces/ITauEventTransformer";

export class IrcConnectedEventTranslator
    implements ITauEventTransformer<typeof TwitchChatMessages.IrcConnected, "IrcConnected"> 
{
    adapterEventType: TauEventNames = "IrcConnected";
    systemMessageType = TwitchChatMessages.IrcConnected;

    buildSystemMessage(adapterMessage: TauEvents["IrcConnected"]): AppMessageSet[typeof TwitchChatMessages.IrcConnected] {
        throw new Error("Method not implemented.");
    }

}