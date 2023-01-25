import IV5EventTransformer from "#adapters/ObsV5Adapter/Interfaces/IV5EventTransformer";
import IV5RequestTransformer from "#adapters/ObsV5Adapter/Interfaces/IV5RequestTransformer";
import type { OBSRequestTypes, OBSEventTypes, OBSResponseTypes } from "obs-websocket-js";

export type ObsV5Events = OBSEventTypes;
export type ObsV5EventName = keyof ObsV5Events;
export type ObsV5EventTransformer = IV5EventTransformer<any, any>;
export type ObsV5EventTransformerSet = ObsV5EventTransformer[];

export type ObsV5Requests = OBSRequestTypes;
export type ObsV5RequestName = keyof ObsV5Requests;
export type ObsV5RequestTransformer = IV5RequestTransformer<any, any, any, any>;
export type ObsV5RequestTransformerSet = ObsV5RequestTransformer[];

export type ObsV5Responses = OBSResponseTypes;
export type ObsV5ResponseName = keyof ObsV5Responses;
