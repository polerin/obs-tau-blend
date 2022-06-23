import IV4EventTransformer from "../Interfaces/IV4EventTransformer";
import IV4RequestTransformer from "../Interfaces/IV4RequestTransformer";
import { SystemMessageNames } from "Shared/MessageHandling";
import { ObsV4EventNames } from "./EventHandlersData";
import { ObsV4RequestNames } from "./RequestMethodsArgs";

export type V4EventTransformer = IV4EventTransformer<SystemMessageNames, ObsV4EventNames>;
export type V4EventTransformerSet = V4EventTransformer[];

export type V4RequestTransformer = IV4RequestTransformer<SystemMessageNames, ObsV4RequestNames>;
export type V4RequestTransformerSet = V4RequestTransformer[];