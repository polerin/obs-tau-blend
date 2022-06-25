import { TwitchMessage } from "Shared/Definitions/Types";

export const TwitchChatMessages = {
    IrcConnected: "twitch.chat.connected",
    IrcDisconnected: "twitch.chat.disconnected",
    JoinedChannel: "twitch.chat.joinedChannel",
    LeftChannel: "twitch.chat.leftChannel",
    ChatMessage : "twitch.chat.message"
} as const;

export interface TwitchChatMessageSet {
    [TwitchChatMessages.IrcConnected] : TwitchMessage;
    [TwitchChatMessages.IrcDisconnected] : TwitchMessage;
    [TwitchChatMessages.JoinedChannel] : TwitchMessage;
    [TwitchChatMessages.LeftChannel] : TwitchMessage;

    [TwitchChatMessages.ChatMessage] : TwitchMessage & {
        channelName : string,
        fromUser: string
    };
}