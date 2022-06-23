import { ObsV4EventHandlersData } from "../../Definitions/EventHandlersData";
import { ObsMessages, SystemMessageSet } from "Shared/MessageHandling";

import IV4EventTransformer from "../../Interfaces/IV4EventTransformer";


export class EventSceneSwitch implements
    IV4EventTransformer<typeof ObsMessages.SwitchScenes, "SwitchScenes">
{
    public readonly adapterEventType = "SwitchScenes";
    public readonly systemMessageType = ObsMessages.SwitchScenes;

    public buildSystemMessage(obsMessage: ObsV4EventHandlersData["SwitchScenes"] | void): SystemMessageSet[typeof ObsMessages.SwitchScenes] {

        if (!obsMessage) {
            // @todo have a exception format plskthx
            throw "Invalid message format supplied";
        }

        return {
            type : "obsMessage",
            name : ObsMessages.SwitchScenes,
            sceneName: (obsMessage) ? obsMessage["scene-name"] : "unknown"
        };
    }
}