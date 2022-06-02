import { ObsV4EventHandlersData } from "../Definitions/EventHandlersData";
import { ObsMessages, AppMessageSet, SystemMessageNames } from "Shared/MessageHandling";

import IV4EventTransformer from "../Interfaces/IV4EventTransformer";

export class EventSceneSwitch implements
    IV4EventTransformer<typeof ObsMessages.SwitchScenes, "SwitchScene">
{
    public readonly obsEventType = "SwitchScene";
    public readonly systemMessageType = ObsMessages.SwitchScenes;

    public buildSystemMessage(obsMessage: ObsV4EventHandlersData["SwitchScenes"]): AppMessageSet[typeof ObsMessages.SwitchScenes] {
        return {
            type : "obsMessage",
            name : ObsMessages.SwitchScenes,
            sceneName: obsMessage["scene-name"]
        }
    }
}