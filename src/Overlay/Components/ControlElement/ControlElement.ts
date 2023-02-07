import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { TypedPubSubBus } from "#infra";
import { IOverlayComponent, ObsRequest, SystemMessages } from "#shared";
import { OverlayComponentType } from "#overlay/Shared/Types";
import AbstractOverlayComponent from "#overlay/Components/AbstractOverlayComponent";

import elementTemplate from "#overlay/Components/ControlElement/ControlElement.template";

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
      sceneName: "SHOW MAIN UPPER",
    } as SystemMessages[typeof ObsRequest.SetCurrentScene];

    console.log("dispatching!", request);
    this.eventBus?.publish(ObsRequest.SetCurrentScene, request);
    console.log("Dispatchedded!");
  }

  protected render() {
    return elementTemplate(this);
  }
}
