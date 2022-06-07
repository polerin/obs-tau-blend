import { ObsV4EventHandlersData, ObsV4EventNames } from "../Definitions/EventHandlersData";
import { ObsMessages, AppMessageSet, SystemMessageNames } from "Shared/MessageHandling";

import IV4EventTransformer from "../Interfaces/IV4EventTransformer";


export class EventWebsocketConnected implements
    IV4EventTransformer<typeof ObsMessages.WebsocketConnected, "ConnectionOpened">
{
    public readonly adapterEventType = "ConnectionOpened";
    public readonly systemMessageType = ObsMessages.WebsocketConnected;


    public buildSystemMessage(obsMessage: ObsV4EventHandlersData["ConnectionOpened"]): AppMessageSet[typeof ObsMessages.WebsocketConnected] {
        return {
            type : "obsMessage",
            name : ObsMessages.WebsocketConnected
        };
    }
}