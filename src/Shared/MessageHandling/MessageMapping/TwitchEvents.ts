import { TwitchMessage } from "Shared/Types";

export const TwitchEventMessages = {
    ChannelFollow : "twitch.event.channel.follow"
} as const;

export interface TwitchEventMessageSet {
    [TwitchEventMessages.ChannelFollow] : TwitchMessage;
}