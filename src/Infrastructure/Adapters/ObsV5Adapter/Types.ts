import IV5EventTransformer from "./Interfaces/IV5EventTransformer";
import IV5RequestTransformer from "./Interfaces/IV5RequestTransformer";
import { ObsEventSet, ObsRequestSet, ObsResponseSet } from "Shared/MessageHandling";
import type { OBSRequestTypes, OBSEventTypes, OBSResponseTypes } from "obs-websocket-js";
import { ServiceAdapterTransformerSet } from "Infrastructure/Shared";

export type ObsV5Events = OBSEventTypes;
export type ObsV5EventName = keyof ObsV5Events;
export type ObsV5EventTransformer = IV5EventTransformer<keyof ObsEventSet, ObsV5EventName>;
export type ObsV5EventTransformerSet = ObsV5EventTransformer[];

export type ObsV5Requests = OBSRequestTypes;
export type ObsV5RequestName = keyof ObsV5Requests;
export type ObsV5RequestTransformer = IV5RequestTransformer<
    keyof ObsRequestSet,
    keyof ObsResponseSet,
    ObsV5RequestName,
    ObsV5ResponseName>;
export type ObsV5RequestTransformerSet = ObsV5RequestTransformer[];

export type ObsV5Responses = OBSResponseTypes;
export type ObsV5ResponseName = keyof ObsV5Responses;

export type ObsV5Messages = ObsEventSet & ObsRequestSet & ObsResponseSet;
export type ObsV5MessageName = keyof ObsV5Messages;
export type ObsV5TransformerSet = ServiceAdapterTransformerSet<ObsV5Messages>;