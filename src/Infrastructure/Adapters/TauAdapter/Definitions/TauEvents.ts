export type TauEventBase = {
    id : string,
    event_id : string,
    event_type: string,  // @todo come back and fill these out with event types
    event_source: "PubSub" | "EventSub" | "TestCall",
    event_data: unknown,
    created : string
};


export interface TauEvents {
    // IrcConnected : {}, // placeholder for now
    ChannelFollow : TauEventBase & {
        event_type: "channel-follow",
        event_data: {
            "user_id": string,
            "user_name": string,
            "user_login": string,
            "followed_at": string,
            "broadcaster_user_id": string,
            "broadcaster_user_name": string,
            "broadcaster_user_login": string
        }
    }

}

export type TauEventNames = keyof TauEvents;