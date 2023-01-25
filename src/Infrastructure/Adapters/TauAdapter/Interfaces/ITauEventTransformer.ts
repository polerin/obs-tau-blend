import { SystemMessageNames } from "#shared";
import { IAdapterEventTransformer } from "#infra/Interfaces/index";
import { TauEventNames, TauEvents } from "#adapters/TauAdapter/Definitions/TauEvents";


export default interface ITauEventTransformer<TauEventName extends TauEventNames, SystemEventName extends SystemMessageNames>
    extends IAdapterEventTransformer<TauEvents, TauEventName, SystemEventName>
{

}