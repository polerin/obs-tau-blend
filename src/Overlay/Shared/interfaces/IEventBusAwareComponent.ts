import { TypedPubSubBus } from "#infra";

export default interface IEventBusAwareComponent extends HTMLElement {
    set eventBus(eventBus: TypedPubSubBus);
}