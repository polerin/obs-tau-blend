import { TwitchMessageBase } from "Shared/Definitions/Types";

export const TwitchEvent = {
    ChannelFollow : "twitch.event.channel.follow"
} as const;

export interface TwitchEventMessages {
    [TwitchEvent.ChannelFollow] : TwitchMessageBase & {
        user_id : string,
        user_name : string,
        user_login : string,
        followed_at : string
    };
}
