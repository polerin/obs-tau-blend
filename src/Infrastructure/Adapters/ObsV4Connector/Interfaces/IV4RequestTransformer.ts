import IAdapterRequestTransformer from "Infrastructure/Interfaces/IAdapterRequestTransformer";
import { SystemMessageSet, SystemMessageNames } from "Shared/MessageHandling";
import { ObsV4Requests, ObsV4RequestNames } from "../Definitions/RequestMethodsArgs";

export default interface IV4RequestTransformer<SystemMessageName extends SystemMessageNames, ObsRequestName  extends ObsV4RequestNames>
    extends IAdapterRequestTransformer<SystemMessageSet, ObsV4Requests, SystemMessageName, ObsRequestName>
{
};