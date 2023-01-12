import { TauEvents, TauEventMap, TauEventBase } from "../../Definitions/TauEvents";
import { SystemMessageByName } from "../../../../../Shared/MessageHandling";

import { TwitchEvent } from "Shared/MessageHandling";

import ITauEventTransformer from "../../Interfaces/ITauEventTransformer";

type _adapterEvent = typeof TauEventMap.ChannelFollow;
type _systemEvent = typeof TwitchEvent.ChannelFollow

export class ChannelFollowEvent
    implements ITauEventTransformer< _adapterEvent, _systemEvent> 
{

    public readonly adapterEventName = TauEventMap.ChannelFollow;
    public readonly systemEventName = TwitchEvent.ChannelFollow;

    buildEventMessage(adapterMessage: TauEvents[_adapterEvent]): SystemMessageByName<_systemEvent> {
        return {
            type : "twitchMessage",
            name : TwitchEvent.ChannelFollow,
            user_id : adapterMessage.event_data.user_id,
            user_name : adapterMessage.event_data.user_name,
            user_login : adapterMessage.event_data.user_login,
            followed_at : adapterMessage.event_data.followed_at
        };
    }
}