import { TwitchMessageBase } from "Shared/Definitions/Types";

export const TwitchChat = {
    IrcConnected: "twitch.chat.connected",
    IrcDisconnected: "twitch.chat.disconnected",
    JoinedChannel: "twitch.chat.joinedChannel",
    LeftChannel: "twitch.chat.leftChannel",
    ChatMessage : "twitch.chat.message"
} as const;

export interface TwitchChatMessages {
    [TwitchChat.IrcConnected] : TwitchMessageBase;
    [TwitchChat.IrcDisconnected] : TwitchMessageBase;
    [TwitchChat.JoinedChannel] : TwitchMessageBase;
    [TwitchChat.LeftChannel] : TwitchMessageBase;

    [TwitchChat.ChatMessage] : TwitchMessageBase & {
        channelName : string,
        fromUser: string
    };
}