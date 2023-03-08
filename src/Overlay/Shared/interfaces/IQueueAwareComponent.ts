import { ReactiveControllerHost } from "lit";

export default interface IQueueAwareComponent<ItemType> extends HTMLElement, ReactiveControllerHost {

    /**
     * Can this component currently accept new items
     */
    get canAcceptItem(): boolean;

    /**
     * How long should this component delay before displaying a new queue component?
     */
    get delay(): number;

    /**
     * How long should this component delay before displaying a new queue component?
     */
    set delay(delay: number);

    /**
     * How long should this component display an item?
     */
    get displayDuration(): number;

    /**
     * How long should this component display an item?
     */
    set displayDuration(duration: number);

    /**
     * Set the item to display
     */
    setCurrentItem(item: ItemType): void;

    /**
     * Clear the currently displayed item
     */
    clearCurrentItem(): void;
}