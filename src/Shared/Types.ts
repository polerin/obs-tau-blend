export type MessageNameList = { [short : string] : string };

export type ControlMessage = {
    type : 'controlMessage';
    name: string;
};

export type ObsMessage = {
    type : 'obsMessage',
    name: string ;
};

export type TwitchMessage = {
    type : 'twitchMessage',
    name: string;
};

export type ControlRequest = {
    type : 'controlRequest',
    name: string;
};