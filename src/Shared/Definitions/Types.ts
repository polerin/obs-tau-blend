export type MessageNameList = { [short : string] : string };

export type SystemMessageBase = {
    type : string,
    name : string,
    source? : "Port" | "Overlay" | "Controller"
}

export type ControlMessage = SystemMessageBase & {
    type : 'controlMessage';
};

export type ObsMessage = SystemMessageBase & {
    type : 'obsMessage',
};


export type ObsRequest = SystemMessageBase & {
    type : 'obsRequest',
};


export type TwitchMessage = SystemMessageBase & {
    type : 'twitchMessage',
};

export type ControlRequest = SystemMessageBase & {
    type : 'controlRequest',
};