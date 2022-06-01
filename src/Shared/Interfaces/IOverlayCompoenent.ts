import { PersistantOverlayComponent, EventOverlayComponent } from "../../Overlay/Components/Shared/Types";

export default interface IOverlayComponent
{
    readonly componentType : PersistantOverlayComponent | EventOverlayComponent;

    registerCallbacks() : void;
    unregisterCallbacks() : void;
}