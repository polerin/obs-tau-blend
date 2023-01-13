import { SystemMessageNames } from "../../../../Shared";
import { IAdapterEventTransformer } from "../../../Interfaces";
import { TauEventNames, TauEvents } from "../Definitions/TauEvents";


export default interface ITauEventTransformer<TauEventName extends TauEventNames, SystemEventName extends SystemMessageNames>
    extends IAdapterEventTransformer<TauEvents, TauEventName, SystemEventName>
{

}