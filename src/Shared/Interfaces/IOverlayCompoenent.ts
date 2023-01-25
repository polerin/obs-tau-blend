import { TypedPubSubBus } from "#infra";
import { OverlayComponentType } from "#overlay/Shared/Types";

export default interface IOverlayComponent
{
    readonly componentType : OverlayComponentType;

    registerCallbacks(eventBus: TypedPubSubBus) : void;
    unregisterCallbacks() : void;
}