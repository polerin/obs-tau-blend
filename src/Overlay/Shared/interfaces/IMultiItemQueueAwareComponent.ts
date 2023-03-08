import IQueueAwareComponent from "#overlay/Shared/interfaces/IQueueAwareComponent";

export default interface IMutliItemQueueAwareComponent<ItemType> extends IQueueAwareComponent<ItemType> {
    /**
     * At what size should the queue start displaying multiple items at a time
     */
    get multiItemThreshold() : number;

    /**
     * At what size should the queue start displaying multiple items at a time
     */
    set multiItemThreshold(threshold: number);

    /**
     * The number of items that should be displayed at once when in multi-display mode?
     */
    get multiItemDisplayCount(): number;

    /**
     * The number of items that should be displayed at once when in multi-display mode?
     */
    set multiItemDisplayCount(display: number);

    /**
     * Set the items to display
     */
    setCurrentItems(items: Array<ItemType>): void;
}