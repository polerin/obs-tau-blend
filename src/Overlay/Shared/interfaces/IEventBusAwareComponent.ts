import { TypedPubSubBus } from "Infrastructure/Shared";

export default interface IEventBusAwareComponent extends HTMLElement {
    set eventBus(eventBus: TypedPubSubBus);
}