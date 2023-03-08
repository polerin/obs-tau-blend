export type ChatChannel = `#${string}`;
export type TwitchSubTier = '1000' | '2000' | '3000';


export type TwitchUser = {
    id?: string;
    userName: string;
    userLogin?: string;
    subscriber?: boolean;
}

export type TwitchChatMessage = {
    channel: ChatChannel;
    user: TwitchUser;
    text: string;
}