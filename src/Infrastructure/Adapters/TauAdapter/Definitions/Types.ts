import ITauEventTransformer from "../Interfaces/ITauEventTransformer"
import { SystemMessageNames } from "Shared/MessageHandling"
import { TauEventNames } from "./TauEvents"

export type TauEventTransformer = ITauEventTransformer<SystemMessageNames, TauEventNames>;
export type TauEventTransformerSet = TauEventTransformer[];