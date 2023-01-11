import {
  IAdapterRequestTransformer,
  IAdapterResponseTransformer,
} from "Infrastructure/Interfaces";
import { ObsRequestSet, ObsResponseSet } from "../../../../Shared/MessageHandling";
import {
  ObsV5Requests,
  ObsV5RequestName,
  ObsV5Responses,
  ObsV5ResponseName,
} from "../Types";

export default interface IV5RequestTransformer<
  SystemRequestMessageName extends keyof ObsRequestSet,
  SystemResponseMessageName extends keyof ObsResponseSet,
  RequestName extends ObsV5RequestName,
  ResponseMessageName extends ObsV5ResponseName
> extends IAdapterRequestTransformer<
      ObsV5Requests,
      ObsRequestSet,
      SystemRequestMessageName,
      RequestName
    >,
    IAdapterResponseTransformer<
      ObsResponseSet,
      ObsV5Responses,
      SystemResponseMessageName,
      ResponseMessageName
    > {}
