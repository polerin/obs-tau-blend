export type TauEventBase = {
    id : string,
    event_id : string,
    event_type: string,  // @todo come back and fill these out with event types
    event_source: "PubSub" | "EventSub" | "TestCall",
    event_data: unknown,
    created : string
};

export const TauEventMap = {
    ChannelFollow : "channel-follow",
    ChannelRedemptionAdd: "channel-channel_points_custom_reward_redemption-add",
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
    }
}

export type TauEvent = TauEvents[keyof TauEvents];
export type TauEventNames = keyof TauEvents;