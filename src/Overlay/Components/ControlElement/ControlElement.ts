import { LitElement } from "lit";
import { customElement } from 'lit/decorators.js';

import elementTemplate from './ControlElement.template';
import IEventBusAwareComponent from "Overlay/Shared/interfaces/IEventBusAwareComponent";
import { TypedPubSubBus } from "Infrastructure/Shared";
import { ObsRequest, SystemMessage, SystemMessages } from "Shared";


@customElement('control-element')
export default class ControlElement extends LitElement implements IEventBusAwareComponent
{
    set eventBus(eventBus: TypedPubSubBus) {
        throw new Error("Method not implemented.");
    }
    public render ()
    { 
        return elementTemplate(this);
    }

    public sendSceneRequest() : void
    {
        const request = {
            name : ObsRequest.SetCurrentScene,
            type : "obsRequest",
            sceneName : "SHOW RIGHT FULL"
        } as SystemMessages[typeof ObsRequest.SetCurrentScene]

        console.log("dispatching!", request);
        this.eventBus?.publish(ObsRequest.SetCurrentScene, request);
        console.log("Dispatchedded!");
    }
}