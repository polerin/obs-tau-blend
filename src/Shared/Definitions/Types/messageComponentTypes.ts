export type ChatChannel = `#${string}`;

export type TwitchUser = {
    id?: string;
    userName: string;
    userLogin?: string;
    subscriber?: boolean;
}

export type ChatMessage = {
    channel: ChatChannel;
    user: TwitchUser;
    text: string;
}