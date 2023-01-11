// External system status definition

import {
  IAdapterEventTransformer,
  IAdapterRequestTransformer,
  IAdapterResponseTransformer,
} from "../Interfaces";
import { FrameworkMessageSet, SystemMessageCallback, SystemMessageDefinitionList } from "Shared";
import TypedPubSubBus from "./TypedPubsubBus";

export type ExternalConnectionStatus = {
  serviceName: string;
  status: "disconnected" | "connecting" | "connected" | "disconnecting";
  details: Record<string, string | number | boolean>;
};

export type ServiceCallback<MessageSet extends SystemMessageDefinitionList> =
  SystemMessageCallback<MessageSet>
  | never;

export type ServiceAdapterTransformer<
  AdapterMessages,
  ServiceMessages extends SystemMessageDefinitionList
> =
  | IAdapterEventTransformer<any, any>
  | IAdapterRequestTransformer<any, any>
  | IAdapterResponseTransformer<any, any>;


export type TransformerRegistry<SystemMessageSet extends SystemMessageDefinitionList, AdapterInterface extends ServiceAdapterTransformer<any, any>> = {
  [msgName in keyof SystemMessageSet]: AdapterInterface; 
};

export type ServiceAdapterTransformerSet<MessageSet extends SystemMessageDefinitionList> = {
  event?: TransformerRegistry<MessageSet, IAdapterEventTransformer<MessageSet, any>>;
  request?: TransformerRegistry<MessageSet, IAdapterRequestTransformer<MessageSet, any>>;
  response?: TransformerRegistry<MessageSet, IAdapterResponseTransformer<MessageSet, any>>;
};

export type TransformerClassifications<AdapterSet extends ServiceAdapterTransformerSet<any>> = keyof AdapterSet;

export type MessageSetFromTransformerSet<Transformers extends ServiceAdapterTransformerSet<any>> = 
  Transformers extends ServiceAdapterTransformerSet<infer ServiceMessages> ? ServiceMessages : never;

export type InferMessageType<Name, MessageSet> = Name extends keyof MessageSet ? MessageSet[Name] 
    : Name extends keyof MessageSet ? MessageSet[Name]
    : never;

export type FrameworkEventBus = TypedPubSubBus<FrameworkMessageSet>; 