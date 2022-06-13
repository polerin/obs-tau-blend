import { TwitchMessage } from "Shared/Types";

export const TwitchEventMessages = {
    ChannelFollow : "twitch.event.channel.follow"
} as const;

export interface TwitchEventMessageSet {
    [TwitchEventMessages.ChannelFollow] : TwitchMessage & {
        user_id : string,
        user_name : string,
        user_login : string,
        followed_at : string
    };
}