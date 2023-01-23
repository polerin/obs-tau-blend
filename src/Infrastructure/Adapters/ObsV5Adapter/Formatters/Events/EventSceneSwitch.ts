import { ObsV5Events, IV5EventTransformer } from "@/Infrastructure/Adapters/ObsV5Adapter"; 
import { ObsEvent, SystemMessageByName } from "@/Shared/MessageHandling";

type _adapterEvent = "CurrentProgramSceneChanged";
type _systemEvent = typeof ObsEvent.SceneSwitched;

export default class EventSceneSwitch implements
    IV5EventTransformer<_adapterEvent, _systemEvent>
{
    public readonly adapterEventName = "CurrentProgramSceneChanged";
    public readonly systemEventName = ObsEvent.SceneSwitched;

    public buildEventMessage(obsMessage: ObsV5Events[_adapterEvent] | void): SystemMessageByName<_systemEvent> {

        if (!obsMessage) {
            // @todo have a exception format plskthx
            throw "Invalid message format supplied";
        }

        return {
            type : "obsEvent",
            name : ObsEvent.SceneSwitched,
            sceneName: (obsMessage) ? obsMessage.sceneName : "unknown"
        };
    }
}