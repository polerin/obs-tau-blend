import IAdapterEventTransformer from "Infrastructure/Interfaces/IAdapterEventTransformer";
import { TauEvents, TauEventNames } from "../Definitions/TauEvents";
import { FrameworkMessageSet, FrameworkMessageNames } from "Shared/MessageHandling";


export default interface ITauEventTransformer<SystemMessageName extends FrameworkMessageNames, TauEventName extends TauEventNames>
    extends IAdapterEventTransformer<TauEvents, TauEventNames, SystemMessageName, TauEventName>
{

}