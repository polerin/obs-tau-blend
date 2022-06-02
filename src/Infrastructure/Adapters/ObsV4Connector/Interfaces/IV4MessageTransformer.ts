import { AppMessageSet, SystemMessageNames } from "Shared/MessageHandling";

export default interface IV4MessageTransformer<SystemMessageName extends SystemMessageNames, ObsMessageType>
{
    buildObsMessage(systemMessage : AppMessageSet[SystemMessageName]) : ObsMessageType
};