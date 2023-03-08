import { TwitchEvent, TwitchSubTier } from "#shared";

export type TauEventBase = {
    id : string,
    event_id : string,
    event_type: string,  // @todo come back and fill these out with event types
    event_source: "PubSub" | "EventSub" | "TestCall",
    event_data: unknown,
    created : string
};

export const TauEventMap = {
    ChannelFollow : 'channel-follow',
    ChannelSubscribe: 'channel-subscribe',
    ChannelRedemptionAdd: 'channel-channel_points_custom_reward_redemption-add',
} as const;

export interface TauEvents {
    // IrcConnected : {}, // placeholder for now
    [TauEventMap.ChannelFollow] : TauEventBase & {
        id: string;
        event_type: "channel-follow";
        event_data: {
            "user_id": string;
            "user_name": string;
            "user_login": string;
            "followed_at": string;
            "broadcaster_user_id": string;
            "broadcaster_user_name": string;
            "broadcaster_user_login": string;
        }
    };
    [TauEventMap.ChannelRedemptionAdd] : TauEventBase & {
        "id": string;
        "event_id": string;
        "event_type": string;
        "event_source": string;
        "event_data": {
            "id": "";
            "reward": {
                "id": string;
                "cost": number,
                "title": string;
                "prompt": string;
            },
            "status": string;
            "user_id": string;
            "user_name": string;
            "user_input": string;
            "user_login": string;
            "redeemed_at": string;
            "broadcaster_user_id": string;
            "broadcaster_user_name": string;
            "broadcaster_user_login": string;
        };
        "created": string;
        "origin": string;
    },
    [TauEventMap.ChannelSubscribe]: {
        "id": string,
        "event_id": string,
        "event_type": "channel-subscription-message",
        "event_source": string,
        "event_data": {
            "user_id": string, 
            "user_login": string,
            "user_name": string,
            "broadcaster_user_id": string,
            "broadcaster_user_login": string,
            "broadcaster_user_name": string,
            "message": {
                "text": string,
                "emotes": null | unknown,
            },
            "tier": TwitchSubTier,
            "cumulative_months": number,
            "streak_months": number,
            "duration_months": number,
        },
        "created": string,
        "origin": string
    },
    // [TwitchEvent.CheerEvent] : {
    //     "id": "b594c569-845f-45be-8ba0-3d1648953e6d",
    //     "event_id": "57kLBhj7n1aJ2o_SVMZAuctxVTmqV10ha-QFJrIIYOo=",
    //     "event_type": "channel-cheer",
    //     "event_source": "EventSub",
    //     "event_data": {
    //         "broadcaster_user_id": "39023189",
    //         "broadcaster_user_login": "polerin",
    //         "broadcaster_user_name": "polerin",
    //         "is_anonymous": false,
    //         "user_id": "268396072",
    //         "user_login": "the_swk",
    //         "user_name": "the_swk",
    //         "message": "cheerwhal10",
    //         "bits": 10
    //     },
    //     "created": "2023-02-27T21:00:07+0000",
    //     "origin": "twitch"
    // },
}

export type TauEvent = TauEvents[keyof TauEvents];
export type TauEventNames = keyof TauEvents;