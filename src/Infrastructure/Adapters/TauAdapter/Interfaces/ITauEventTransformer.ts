import IAdapterEventTransformer from "Infrastructure/Interfaces/IAdapterEventTransformer";
import { TauEvents, TauEventNames } from "../Definitions/TauEvents";
import { AppMessageSet, SystemMessageNames } from "Shared/MessageHandling";


export default interface ITauEventTransformer<SystemMessageName extends SystemMessageNames, TauEventName extends TauEventNames>
    extends IAdapterEventTransformer<TauEvents, TauEventNames, SystemMessageName, TauEventName>
{

}