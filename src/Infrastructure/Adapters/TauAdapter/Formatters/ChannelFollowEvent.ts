import { TauEventNames, TauEvents } from "../Definitions/TauEvents";
import { AppMessageSet } from "Shared/MessageHandling";

import { TwitchEventMessages } from "Shared/MessageHandling";

import ITauEventTransformer from "../Interfaces/ITauEventTransformer";

export class ChannelFollowEvent
    implements ITauEventTransformer<typeof TwitchEventMessages.ChannelFollow, "ChannelFollow"> 
{
    adapterEventType: TauEventNames = "ChannelFollow";
    systemMessageType = TwitchEventMessages.ChannelFollow;

    buildSystemMessage(adapterMessage: TauEvents["ChannelFollow"]): AppMessageSet[typeof TwitchEventMessages.ChannelFollow] {
        return {
            "type" : "twitchMessage",
            "name" : TwitchEventMessages.ChannelFollow,
        };
    }

}