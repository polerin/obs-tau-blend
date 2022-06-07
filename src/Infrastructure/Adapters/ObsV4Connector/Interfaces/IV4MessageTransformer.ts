import { AppMessageSet, SystemMessageNames } from "Shared/MessageHandling";

export default interface IV4MessageTransformer<SystemMessageName extends SystemMessageNames, ObsMessageType>
{
    buildAdapterMessage(systemMessage : AppMessageSet[SystemMessageName]) : ObsMessageType
};