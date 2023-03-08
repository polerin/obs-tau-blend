import { ReactiveController, ReactiveControllerHost } from 'lit';
import { MutiItemQueueAwareConfiguration } from '#overlay/Shared/Types';
import _ from 'lodash';
import { IMultiItemQueueAwareComponent } from '../index.js';

export default class MultiItemQueueController<ItemType> implements ReactiveController {

    /**
     * Interval token used if we are currently displaying, null otherwise
     *
     * Used for stopping the interval loop when we have an empty buffer
     */
    protected displayIntervalToken?: ReturnType<typeof setInterval> | null;

    protected options: Required<MutiItemQueueAwareConfiguration>; 
    protected defaultOptions : Required<MutiItemQueueAwareConfiguration> = {
        delay: 500,
        duration: 5000,
        multiItemDisplayCount: 10,
        multiItemThreshold: 5
    };

    protected queue : Array<ItemType> = [];

    constructor(private host: IMultiItemQueueAwareComponent<ItemType>, options: MutiItemQueueAwareConfiguration) {
        this.options = { ... this.defaultOptions, ...options};
        this.host.addController(this);
    }

    public addItem(newItem: ItemType): void {
        this.queue.push(newItem);

        this.startDisplayCycle();
    }

    // @todo link this with a display request
    protected async startDisplayCycle(): Promise<void> {
        if (this.displayIntervalToken) {
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, this.options.delay));

        this.displayIntervalToken = setInterval(this.displayTick, this.options.duration);

        // initial display of notification
        this.displayTick();
    }

    protected displayTick = (): void => {
        if (!this.host.canAcceptItem || !this.displayIntervalToken) {
            // we aren't allowed to display yet, or the interval loop isn't running (?!)
            return;
        }

        if (this.queue.length >= this.options.multiItemThreshold) {
            // prepping the next chunk of followers for multi-follow
            const selected = _.slice(
                this.queue,
                0,
                this.options.multiItemDisplayCount
            );

            this.host.setCurrentItems(selected);

            // remove those items from the newFollowBuffer
            this.queue = _.drop(
                this.queue,
                selected.length
            );

            return;
        };

        const single = this.queue.shift();

        if (single) {
            this.host.setCurrentItem(single);

            return;
        }

        // Nothing to display, clean up and end loop
        this.queue = [];
        this.host.clearCurrentItem();

        clearInterval(this.displayIntervalToken);
        this.displayIntervalToken = undefined;
    }

    hostDisconnected() {
        this.host.clearCurrentItem();
    }
}