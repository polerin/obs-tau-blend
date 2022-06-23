import IAdapterEventTransformer from "Infrastructure/Interfaces/IAdapterEventTransformer";
import { SystemMessageSet, SystemMessageNames } from "Shared/MessageHandling";
import { ObsV4EventNames, ObsV4EventHandlersData } from "../Definitions/EventHandlersData";

export default interface IV4EventTransformer<SystemMessageName extends SystemMessageNames, ObsMessageName extends ObsV4EventNames>
    extends IAdapterEventTransformer<ObsV4EventHandlersData, ObsV4EventNames, SystemMessageName, ObsMessageName>
{
};