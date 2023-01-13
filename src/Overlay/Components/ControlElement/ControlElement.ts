import { LitElement } from "lit";
import { customElement } from "lit/decorators";
import { TypedPubSubBus } from "../../../Infrastructure";
import { ObsRequest, SystemMessages } from "../../../Shared";
import IEventBusAwareComponent from "../../Shared/interfaces/IEventBusAwareComponent";

import elementTemplate from "./ControlElement.template";

@customElement("control-element")
export default class ControlElement
  extends LitElement
  implements IEventBusAwareComponent
{
  set eventBus(eventBus: TypedPubSubBus) {
    throw new Error("Method not implemented.");
  }
  public render() {
    return elementTemplate(this);
  }

  public sendSceneRequest(): void {
    const request = {
      name: ObsRequest.SetCurrentScene,
      type: "obsRequest",
      sceneName: "SHOW RIGHT FULL",
    } as SystemMessages[typeof ObsRequest.SetCurrentScene];

    console.log("dispatching!", request);
    this.eventBus?.publish(ObsRequest.SetCurrentScene, request);
    console.log("Dispatchedded!");
  }
}
