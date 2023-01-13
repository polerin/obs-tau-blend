import { TypedPubSubBus } from "../../../Infrastructure";

export default interface IEventBusAwareComponent extends HTMLElement {
    set eventBus(eventBus: TypedPubSubBus);
}