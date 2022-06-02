import IV4EventTransformer from "../Interfaces/IV4EventTransformer";
import { SystemMessageNames } from "Shared/MessageHandling";
import { ObsV4EventNames } from "./EventHandlersData";

export type V4EventTransformer = IV4EventTransformer<SystemMessageNames, ObsV4EventNames>;
export type V4EventTransformerSet = V4EventTransformer[];