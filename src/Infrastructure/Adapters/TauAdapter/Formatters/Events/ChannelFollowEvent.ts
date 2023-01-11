import { TauEventNames, TauEvents, TauEventMap } from "../../Definitions/TauEvents";
import { FrameworkMessageSet } from "Shared/MessageHandling";

import { TwitchEventMessages } from "Shared/MessageHandling";

import ITauEventTransformer from "../../Interfaces/ITauEventTransformer";

export class ChannelFollowEvent
    implements ITauEventTransformer<typeof TwitchEventMessages.ChannelFollow, typeof TauEventMap.ChannelFollow> 
{
    adapterEventName: TauEventNames = TauEventMap.ChannelFollow;
    systemEventName = TwitchEventMessages.ChannelFollow;

    buildSystemMessage(adapterMessage: TauEvents[typeof TauEventMap.ChannelFollow]): FrameworkMessageSet[typeof TwitchEventMessages.ChannelFollow] {
        return {
            type : "twitchMessage",
            name : TwitchEventMessages.ChannelFollow,
            user_id : adapterMessage.event_data.user_id,
            user_name : adapterMessage.event_data.user_name,
            user_login : adapterMessage.event_data.user_login,
            followed_at : adapterMessage.event_data.followed_at
        };
    }
}