import { TypedPubSubBus } from "../../Infrastructure";
import { OverlayComponentType } from "../../Overlay/Shared/Types";

export default interface IOverlayComponent
{
    readonly componentType : OverlayComponentType;

    registerCallbacks(eventBus: TypedPubSubBus) : void;
    unregisterCallbacks() : void;
}