import { TypedPubSubBus } from "../../Infrastructure";
import { PersistantOverlayComponent, EventOverlayComponent } from "../../Overlay/Shared/Types";

export default interface IOverlayComponent
{
    readonly componentType : PersistantOverlayComponent | EventOverlayComponent;

    registerCallbacks(eventBus: TypedPubSubBus) : void;
    unregisterCallbacks() : void;
}