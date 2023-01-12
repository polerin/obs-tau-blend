import IAdapterEventTransformer from "Infrastructure/Interfaces/IAdapterEventTransformer";
import { TauEvents, TauEventNames } from "../Definitions/TauEvents";
import { SystemMessageNames } from "Shared/MessageHandling";


export default interface ITauEventTransformer<TauEventName extends TauEventNames, SystemEventName extends SystemMessageNames>
    extends IAdapterEventTransformer<TauEvents, TauEventName, SystemEventName>
{

}