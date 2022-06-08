import { ObsV4EventHandlersData } from "../Definitions/EventHandlersData";
import { ObsMessages, AppMessageSet } from "Shared/MessageHandling";

import IV4EventTransformer from "../Interfaces/IV4EventTransformer";

export class EventSceneSwitch implements
    IV4EventTransformer<typeof ObsMessages.SwitchScenes, "SwitchScenes">
{
    public readonly adapterEventType = "SwitchScenes";
    public readonly systemMessageType = ObsMessages.SwitchScenes;

    public buildSystemMessage(obsMessage: ObsV4EventHandlersData["SwitchScenes"] | void): AppMessageSet[typeof ObsMessages.SwitchScenes] {

        return {
            type : "obsMessage",
            name : ObsMessages.SwitchScenes,
            sceneName: (obsMessage) ? obsMessage["scene-name"] : "unknown"
        };
    }
}