import { OBSEventTypes } from "obs-websocket-js";
import { ObsEvents, FrameworkMessageSet } from "Shared/MessageHandling";

import IV4EventTransformer from "../../Interfaces/IV5EventTransformer";


export class EventSceneSwitch implements
    IV4EventTransformer<typeof ObsEvents.SwitchScenes, 'SceneTransitionEnded'>
{
    public readonly adapterEventName = "SceneTransitionEnded";
    public readonly systemEventName = ObsEvents.SwitchScenes;

    public buildSystemMessage(obsMessage: OBSEventTypes['SceneTransitionEnded'] | void): FrameworkMessageSet[typeof ObsEvents.SwitchScenes] {

        if (!obsMessage) {
            // @todo have a exception format plskthx
            throw "Invalid message format supplied";
        }

        return {
            type : "obsMessage",
            name : ObsEvents.SwitchScenes,
            sceneName: (obsMessage) ? obsMessage["scene-name"] : "unknown"
        };
    }
}