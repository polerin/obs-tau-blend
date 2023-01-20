import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { TypedPubSubBus } from "../../../Infrastructure";
import { IOverlayComponent, ObsRequest, SystemMessages } from "../../../Shared";
import { OverlayComponentType } from "../../Shared/Types";
import AbstractOverlayComponent from "../AbstractOverlayComponent";

import elementTemplate from "./ControlElement.template";

@customElement("control-element")
export default class ControlElement extends AbstractOverlayComponent {
  public componentType: OverlayComponentType = "persistant";

  public registerCallbacks(eventBus: TypedPubSubBus): void {
    super.registerCallbacks(eventBus);
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

  protected render() {
    return elementTemplate(this);
  }
}
