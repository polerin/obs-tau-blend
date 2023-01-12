import IAdapterEventTransformer from "Infrastructure/Interfaces/IAdapterEventTransformer";
import { SystemMessageNames } from "Shared/MessageHandling";
import { ObsV5EventName, ObsV5Events } from "../Types";

export default interface IV5EventTransformer<ObsEventName extends ObsV5EventName, SystemEventName extends SystemMessageNames>
    extends IAdapterEventTransformer<ObsV5Events, ObsEventName, SystemEventName>
{
};