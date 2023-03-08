import { TauEvents, TauEventMap } from "#adapters/TauAdapter/Definitions/TauEvents";
import { SystemMessageByName, TwitchEvent } from "#shared";

import ITauEventTransformer from "#adapters/TauAdapter/Interfaces/ITauEventTransformer";

type _adapterEvent = typeof TauEventMap.ChannelSubscribe;
type _systemEvent = typeof TwitchEvent.ChannelSubscribe;

export class ChannelSubscriptionEvent 
    implements ITauEventTransformer< _adapterEvent, _systemEvent> 
{
    public readonly adapterEventName = TauEventMap.ChannelSubscribe;
    public readonly systemEventName = TwitchEvent.ChannelSubscribe;

    buildEventMessage(adapterMessage: TauEvents[_adapterEvent]): SystemMessageByName<_systemEvent> {
        const user = {
            id : adapterMessage.event_data.user_id,
            userName : adapterMessage.event_data.user_name,
            userLogin : adapterMessage.event_data.user_login,
        };

        return {
            type : "twitchMessage",
            name : TwitchEvent.ChannelSubscribe,
            id: adapterMessage.id,
            user: user,
            broadcaster: {
                id: adapterMessage.event_data.broadcaster_user_id,
                userLogin: adapterMessage.event_data.broadcaster_user_login,
                userName: adapterMessage.event_data.broadcaster_user_name,
            },
            tier: adapterMessage.event_data.tier,
            userInput: {
                channel: `#${adapterMessage.event_data.broadcaster_user_name}`,
                user: user,
                text: adapterMessage.event_data.message?.text,
            },
            cumulativeMonths: adapterMessage.event_data.cumulative_months,
            streakMonths: adapterMessage.event_data.streak_months,
            durationMonths: adapterMessage.event_data.duration_months,

        };
    }
}