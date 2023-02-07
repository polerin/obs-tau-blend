import { TwitchMessageBase, TwitchUser } from "#shared/Definitions/Types/index";

export const TwitchEvent = {
  ChannelFollow: "twitch.event.channel.follow",
  ChannelRedeem: "twitch.event.channel.reward.redemption.add",
} as const;

export interface TwitchEventMessages {
  [TwitchEvent.ChannelFollow]: TwitchMessageBase & {
    name: typeof TwitchEvent.ChannelFollow;
    user_id: string;
    user_name: string;
    user_login: string;
    followed_at: string;
  };

  [TwitchEvent.ChannelRedeem]: TwitchMessageBase & {
    name: typeof TwitchEvent.ChannelRedeem;
    id: string;
    broadcaster: TwitchUser;
    user: TwitchUser;

    userInput: string;
    redeemedAt: string;

    // @todo see if this needs to be extracted to a separate data type for activation/deactivation
    reward: {
       id: string;
       cost: number;
       title: string;
       prompt: string;
    }
  }
}
