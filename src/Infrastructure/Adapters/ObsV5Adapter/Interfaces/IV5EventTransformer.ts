import { SystemMessageNames } from "#shared";
import { IAdapterEventTransformer } from "#infra/Interfaces/index";
import { ObsV5EventName, ObsV5Events } from "#adapters/ObsV5Adapter/Types";

export default interface IV5EventTransformer<ObsEventName extends ObsV5EventName, SystemEventName extends SystemMessageNames>
    extends IAdapterEventTransformer<ObsV5Events, ObsEventName, SystemEventName>
{
};