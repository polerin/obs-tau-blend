import { AppMessageSet, SystemMessageNames } from "Shared/MessageHandling";
import { ObsV4EventNames, ObsV4EventHandlersData } from "../Definitions/EventHandlersData";

export default interface IV4EventTransformer<SystemMessageName extends SystemMessageNames, ObsMessageName extends ObsV4EventNames>
{
    obsEventType : ObsMessageName;
    readonly systemMessageType : SystemMessageName;

    buildSystemMessage(obsMessage : ObsV4EventHandlersData[ObsMessageName]) : AppMessageSet[SystemMessageName]
};