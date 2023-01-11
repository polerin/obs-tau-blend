import ITauEventTransformer from "../Interfaces/ITauEventTransformer"
import { FrameworkMessageNames } from "Shared/MessageHandling"
import { TauEventNames } from "./TauEvents"

export type TauEventTransformer = ITauEventTransformer<FrameworkMessageNames, TauEventNames>;
export type TauEventTransformerSet = TauEventTransformer[];