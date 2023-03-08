export type PersistantOverlayComponent = "persistant";
export type EventOverlayComponent = "event";

export type OverlayComponentType = PersistantOverlayComponent | EventOverlayComponent;

export type QueueAwareConfiguration = {
    delay?: number;
    duration?: number;
};

export type MutiItemQueueAwareConfiguration = QueueAwareConfiguration & {
    multiItemThreshold?: number;
    multiItemDisplayCount?: number;
};