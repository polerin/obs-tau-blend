import { IAdapterResponseTransformer } from "../../../Interfaces";
import { FrameworkMessageSet, FrameworkMessageNames } from "Shared/MessageHandling";
import { ObsV5Requests, ObsV5ResponseName } from "../Types";


export default interface IV4ResponseTransformer<SystemMessageName extends FrameworkMessageNames, ResponseName extends ObsV5ResponseName>
    extends IAdapterResponseTransformer<FrameworkMessageSet, ObsV5Requests, SystemMessageName, ResponseName>
{
};