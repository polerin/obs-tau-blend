import { LitElement } from "lit";
import { TypedPubSubBus } from "#infra";
import { IOverlayComponent, SystemMessageCallback, SystemMessageNames } from "#shared";
import { OverlayComponentType } from "#overlay/Shared/Types";

export default abstract class AbstractOverlayComponent extends LitElement implements IOverlayComponent {
    public abstract readonly componentType: OverlayComponentType;

    protected subscriptionTokens: Array<ReturnType<TypedPubSubBus['subscribe']>> = [];

    protected eventBus?: TypedPubSubBus;
    
    public registerCallbacks(eventBus: TypedPubSubBus): void {
        console.log("heyyyyy");
        this.eventBus = eventBus;
    }

    protected registerCallback(eventName: SystemMessageNames | string, callback: SystemMessageCallback) : void  {
        if (!this.eventBus) {
            console.error('Attempting to register a callback before receiving an event bus');

            return;
        }

        this.subscriptionTokens.push(this.eventBus.subscribe(eventName, callback));
    }

    public unregisterCallbacks(): void {
        if (!this.eventBus) {
            return; 
        }

        this.subscriptionTokens.forEach(this.eventBus.unsubscribe);
    }

}