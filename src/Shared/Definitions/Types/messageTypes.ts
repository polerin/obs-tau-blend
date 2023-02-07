export type CheckedDefinitionList<
  NameSource extends Record<string, string>,
  Definitions extends { [MsgName in NameSource[keyof NameSource]]: object }
> = {
  [MsgName in keyof Definitions]: Definitions[MsgName] & {name: MsgName};
};

export type SystemMessageBase = {
  type: string;
  name: string;
  source?: "Port" | "Overlay" | "Controller";
};

export type ControlMessage = SystemMessageBase & {
  type: "controlMessage";
};

export type ObsEventMessage = SystemMessageBase & {
  type: "obsEvent";
};

export type ObsRequestMessage = SystemMessageBase & {
  type: "obsRequest";
};

export type ObsResponseMessage = SystemMessageBase & {
  type: "obsResponse";
};

export type TwitchMessageBase = SystemMessageBase & {
  type: "twitchMessage";
};

export type ControlRequestMessage = SystemMessageBase & {
  type: "controlRequest";
};
