import IAdapterEventTransformer from "Infrastructure/Interfaces/IAdapterEventTransformer";
import { ObsEventSet, FrameworkMessageNames } from "Shared/MessageHandling";
import { ObsV5EventName, ObsV5Events } from "../Types";

export default interface IV5EventTransformer<SystemMessageName extends keyof ObsEventSet, ObsMessageName extends ObsV5EventName>
    extends IAdapterEventTransformer<ObsEventSet, ObsV5Events ,SystemMessageName, ObsMessageName>
{
};