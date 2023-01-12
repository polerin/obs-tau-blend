import {
  IAdapterRequestTransformer,
  IAdapterResponseTransformer,
} from "Infrastructure/Interfaces";
import { SystemMessageNames } from "Shared";
import {
  ObsV5Requests,
  ObsV5RequestName,
  ObsV5Responses,
  ObsV5ResponseName,
} from "../Types";

export default interface IV5RequestTransformer<
  RequestName extends ObsV5RequestName,
  ResponseName extends ObsV5ResponseName,
  SystemRequestName extends SystemMessageNames,
  SystemResponseName extends SystemMessageNames
> extends IAdapterRequestTransformer<
      ObsV5Requests,
      RequestName,
      SystemRequestName
    >,
    IAdapterResponseTransformer<
      ObsV5Responses,
      ResponseName,
      SystemResponseName
    > {}
