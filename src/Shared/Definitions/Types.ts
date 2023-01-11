export type CheckedDefinitionList<
  NameSource extends Record<string, string>,
  Definitions extends { [MsgName in NameSource[keyof NameSource]]: object }
> = {
  [MsgName in keyof Definitions]: Definitions[MsgName] & {name: MsgName};
};

export type SystemMessageDefinitionList = CheckedDefinitionList<any, any>;
export type SystemMessageNames<MessageSet extends SystemMessageDefinitionList> = keyof MessageSet & string;

export type SystemMessageBase = {
  type: string;
  name: string;
  source?: "Port" | "Overlay" | "Controller";
};

export type ControlMessage = SystemMessageBase & {
  type: "controlMessage";
};

export type ObsEvent = SystemMessageBase & {
  type: "obsEvent";
};

export type ObsRequest = SystemMessageBase & {
  type: "obsRequest";
};

export type ObsResponse = SystemMessageBase & {
  type: "obsResponse";
};

export type TwitchMessage = SystemMessageBase & {
  type: "twitchMessage";
};

export type ControlRequest = SystemMessageBase & {
  type: "controlRequest";
};
