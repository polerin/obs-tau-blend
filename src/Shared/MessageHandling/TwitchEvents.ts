import { TwitchMessageBase } from "#shared/Definitions/Types";

export const TwitchEvent = {
  ChannelFollow: "twitch.event.channel.follow",
} as const;

export interface TwitchEventMessages {
  [TwitchEvent.ChannelFollow]: TwitchMessageBase & {
    name: typeof TwitchEvent.ChannelFollow;
    user_id: string;
    user_name: string;
    user_login: string;
    followed_at: string;
  };
}
