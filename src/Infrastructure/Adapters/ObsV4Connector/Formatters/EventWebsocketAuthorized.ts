import { ObsV4EventHandlersData } from "../Definitions/EventHandlersData";
import { ObsMessages, AppMessageSet } from "Shared/MessageHandling";

import IV4EventTransformer from "../Interfaces/IV4EventTransformer";


// Implemented for later use, not currently imported
export class EventWebsocketAuthorized implements
    IV4EventTransformer<typeof ObsMessages.WebsocketAuthorized, "AuthenticationSuccess">
{
    public readonly obsEventType = "AuthenticationSuccess";
    public readonly systemMessageType = ObsMessages.WebsocketAuthorized;

    public buildSystemMessage(obsMessage: ObsV4EventHandlersData["AuthenticationSuccess"]): AppMessageSet[typeof ObsMessages.WebsocketAuthorized] {
        return {
            type : "obsMessage",
            name : ObsMessages.WebsocketAuthorized
        };
    }
}