// External system status definition

import {
  IAdapterEventTransformer,
  IAdapterRequestTransformer,
  IAdapterResponseTransformer,
} from "../Interfaces";

export type ExternalConnectionStatus = {
  serviceName: string;
  status: "disconnected" | "connecting" | "connected" | "disconnecting";
  details: Record<string, string | number | boolean>;
};

export type ServiceAdapterTransformer =
  | IAdapterEventTransformer<any, any, any>
  | IAdapterRequestTransformer<any, any, any>
  | IAdapterResponseTransformer<any, any, any>;

export type TransformerInterfaceType<T extends TransformerClassifications> =
  T extends "event"
    ? IAdapterEventTransformer<any, any, any>
    : T extends "request"
    ? IAdapterRequestTransformer<any, any, any>
    : T extends "response"
    ? IAdapterResponseTransformer<any, any, any>
    : never;

export type TransformerRegistry<
  TransformerType extends TransformerClassifications
> = {
  [msgName: string]: TransformerInterfaceType<TransformerType>;
};

export type ServiceAdapterTransformerSet = {
  event?: TransformerRegistry<'event'>;
  request?: TransformerRegistry<'request'>;
  response?: TransformerRegistry<'response'>;
};

export type TransformerClassifications = keyof ServiceAdapterTransformerSet;

export type InferMessageType<Name, MessageSet> = Name extends keyof MessageSet
  ? MessageSet[Name]
  : Name extends keyof MessageSet
  ? MessageSet[Name]
  : never;
