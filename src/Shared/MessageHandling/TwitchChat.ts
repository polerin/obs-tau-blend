import { TwitchMessageBase } from "../../Shared/Definitions/Types";

export const TwitchChat = {
  IrcConnected: "twitch.chat.connected",
  IrcDisconnected: "twitch.chat.disconnected",
  JoinedChannel: "twitch.chat.joinedChannel",
  LeftChannel: "twitch.chat.leftChannel",
  ChatMessage: "twitch.chat.message",
} as const;

export interface TwitchChatMessages {
  [TwitchChat.IrcConnected]: TwitchMessageBase & {
    name: typeof TwitchChat.IrcConnected;
  };

  [TwitchChat.IrcDisconnected]: TwitchMessageBase & {
    name: typeof TwitchChat.IrcDisconnected;
  };

  [TwitchChat.JoinedChannel]: TwitchMessageBase & {
    name: typeof TwitchChat.JoinedChannel;
  };

  [TwitchChat.LeftChannel]: TwitchMessageBase & {
    name: typeof TwitchChat.LeftChannel;
  };

  [TwitchChat.ChatMessage]: TwitchMessageBase & {
    name: typeof TwitchChat.ChatMessage;
    channelName: string;
    fromUser: string;
  };
}
