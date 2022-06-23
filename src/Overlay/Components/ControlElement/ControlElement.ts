import { LitElement } from "lit";
import {customElement} from 'lit/decorators.js';
import { SystemMessageSet, ObsRequests } from "Shared/MessageHandling";
import { publish } from "Infrastructure/Shared/TypedPubsub";

import elementTemplate from './ControlElement.template';


@customElement('control-element')
export class ControlElement extends LitElement
{
    public render ()
    { 
        return elementTemplate(this);
    }

    public sendSceneRequest() : void
    {
        const request = {
            name : ObsRequests.SetCurrentScene,
            type : "obsRequest",
            sceneName : "SHOW RIGHT FULL"
        } as SystemMessageSet[typeof ObsRequests.SetCurrentScene]

        console.log("dispatching!", request);
        publish(ObsRequests.SetCurrentScene, request);
        console.log("Dispatchedded!");
    }
}