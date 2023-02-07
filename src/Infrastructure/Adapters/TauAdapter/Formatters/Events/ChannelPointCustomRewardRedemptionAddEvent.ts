import { TauEvents, TauEventMap } from "#adapters/TauAdapter/Definitions/TauEvents";
import { SystemMessageByName, TwitchEvent } from "#shared";

import ITauEventTransformer from "#adapters/TauAdapter/Interfaces/ITauEventTransformer";

type _adapterEvent = typeof TauEventMap.ChannelRedemptionAdd;
type _systemEvent = typeof TwitchEvent.ChannelRedeem;

export class ChannelPointCustomRewardRedemptionAddEvent 
    implements ITauEventTransformer< _adapterEvent, _systemEvent> 
{
    public readonly adapterEventName = TauEventMap.ChannelRedemptionAdd;
    public readonly systemEventName = TwitchEvent.ChannelRedeem;

    buildEventMessage(adapterMessage: TauEvents[_adapterEvent]): SystemMessageByName<_systemEvent> {
        return {
            type : "twitchMessage",
            name : TwitchEvent.ChannelRedeem,

            id: adapterMessage.event_data.id,
            user: {
                id : adapterMessage.event_data.user_id,
                userName : adapterMessage.event_data.user_name,
                userLogin : adapterMessage.event_data.user_login,
            },
            broadcaster: {
                id: adapterMessage.event_data.broadcaster_user_id,
                userLogin: adapterMessage.event_data.broadcaster_user_login,
                userName: adapterMessage.event_data.broadcaster_user_name,
            },

            redeemedAt: adapterMessage.event_data.redeemed_at,
            userInput: adapterMessage.event_data.user_input,
            reward: adapterMessage.event_data.reward,
        };
    }
}