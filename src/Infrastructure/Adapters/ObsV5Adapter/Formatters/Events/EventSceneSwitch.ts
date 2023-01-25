
import { IV5EventTransformer } from "#adapters/ObsV5Adapter/Interfaces/index"; 
import { ObsV5Events } from "#adapters/ObsV5Adapter/Types"; 
import { ObsEvent, SystemMessageByName } from "#shared";

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