import _ from 'lodash';
import ObsWebSocket from 'obs-websocket-js';


const obs = new ObsWebSocket();


type EventHandlerListener = (Parameters<typeof obs.on>)[1];

export type ConnectionOpened = Extract<Parameters<EventHandlerListener>[0], void>;
export type ConnectionClosed = Extract<Parameters<EventHandlerListener>[0], void>;
export type AuthenticationSuccess = Extract<Parameters<EventHandlerListener>[0], void>;
export type AuthenticationFailure = Extract<Parameters<EventHandlerListener>[0], void>;
export type error = Extract<Parameters<EventHandlerListener>[0], {
  error: any;
  message: string;
  type: string;
}>;

export type SwitchScenes = Extract<Parameters<EventHandlerListener>[0], { "scene-name": string; sources: ObsWebSocket.SceneItem[] }>;

export type ScenesChanged = Extract<Parameters<EventHandlerListener>[0], { scenes: ObsWebSocket.Scene[] }>;

export type SceneCollectionChanged = Extract<Parameters<EventHandlerListener>[0], { sceneCollection: string }>;

export type SceneCollectionListChanged = Extract<Parameters<EventHandlerListener>[0], { sceneCollections: { name: string }[] }>;

export type SwitchTransition = Extract<Parameters<EventHandlerListener>[0], { "transition-name": string }>;

export type TransitionListChanged = Extract<Parameters<EventHandlerListener>[0], { transitions: { name: string }[] }>;

export type TransitionDurationChanged = Extract<Parameters<EventHandlerListener>[0], { "new-duration": number }>;

export type TransitionBegin = Extract<Parameters<EventHandlerListener>[0], {
  name: string;
  type: string;
  duration: number;
  "from-scene"?: string;
  "to-scene": string;
}>;

export type TransitionEnd = Extract<Parameters<EventHandlerListener>[0], {
  name: string;
  type: string;
  duration: number;
  "to-scene": string;
}>;

export type TransitionVideoEnd = Extract<Parameters<EventHandlerListener>[0], {
  name: string;
  type: string;
  duration: number;
  "from-scene"?: string;
  "to-scene": string;
}>;

export type ProfileChanged = Extract<Parameters<EventHandlerListener>[0], { profile: string }>;

export type ProfileListChanged = Extract<Parameters<EventHandlerListener>[0], { profiles: { name: string }[] }>;

export type StreamStarting = Extract<Parameters<EventHandlerListener>[0], { "preview-only": boolean }>;

export type StreamStarted = Extract<Parameters<EventHandlerListener>[0], void>;

export type StreamStopping = Extract<Parameters<EventHandlerListener>[0], { "preview-only": boolean }>;

export type StreamStopped = Extract<Parameters<EventHandlerListener>[0], void>;

export type StreamStatus = Extract<Parameters<EventHandlerListener>[0], {
  streaming: boolean;
  recording: boolean;
  "replay-buffer-active": boolean;
  "bytes-per-sec": number;
  "kbits-per-sec": number;
  strain: number;
  "total-stream-time": number;
  "num-total-frames": number;
  "num-dropped-frames": number;
  fps: number;
  "render-total-frames": number;
  "render-missed-frames": number;
  "output-total-frames": number;
  "output-skipped-frames": number;
  "average-frame-time": number;
  "cpu-usage": number;
  "memory-usage": number;
  "free-disk-space": number;
  "preview-only": boolean;
}>;

export type RecordingStarting = Extract<Parameters<EventHandlerListener>[0], void>;

export type RecordingStarted = Extract<Parameters<EventHandlerListener>[0], { recordingFilename: string }>;

export type RecordingStopping = Extract<Parameters<EventHandlerListener>[0], { recordingFilename: string }>;

export type RecordingStopped = Extract<Parameters<EventHandlerListener>[0], { recordingFilename: string }>;

export type RecordingPaused = Extract<Parameters<EventHandlerListener>[0], void>;

export type RecordingResumed = Extract<Parameters<EventHandlerListener>[0], void>;

export type VirtualCamStarted = Extract<Parameters<EventHandlerListener>[0], void>;

export type VirtualCamStopped = Extract<Parameters<EventHandlerListener>[0], void>;

export type ReplayStarting = Extract<Parameters<EventHandlerListener>[0], void>;

export type ReplayStarted = Extract<Parameters<EventHandlerListener>[0], void>;

export type ReplayStopping = Extract<Parameters<EventHandlerListener>[0], void>;

export type ReplayStopped = Extract<Parameters<EventHandlerListener>[0], void>;

export type Exiting = Extract<Parameters<EventHandlerListener>[0], void>;

export type Heartbeat = Extract<Parameters<EventHandlerListener>[0], {
  pulse: boolean;
  "current-profile"?: string;
  "current-scene"?: string;
  streaming?: boolean;
  "total-stream-time"?: number;
  "total-stream-bytes"?: number;
  "total-stream-frames"?: number;
  recording?: boolean;
  "total-record-time"?: number;
  "total-record-bytes"?: number;
  "total-record-frames"?: number;
  stats: ObsWebSocket.OBSStats;
}>;

export type BroadcastCustomMessage = Extract<Parameters<EventHandlerListener>[0], { realm: string; data: {} }>;

export type SourceCreated = Extract<Parameters<EventHandlerListener>[0], {
  sourceName: string;
  sourceType: string;
  sourceKind: string;
  sourceSettings: {};
}>;

export type SourceDestroyed = Extract<Parameters<EventHandlerListener>[0], {
  sourceName: string;
  sourceType: string;
  sourceKind: string;
}>;

export type SourceVolumeChanged = Extract<Parameters<EventHandlerListener>[0], {
  sourceName: string;
  volume: number;
  volumeDb: number;
}>;

export type SourceMuteStateChanged = Extract<Parameters<EventHandlerListener>[0], { sourceName: string; muted: boolean }>;

export type SourceAudioDeactivated = Extract<Parameters<EventHandlerListener>[0], { sourceName: string }>;

export type SourceAudioActivated = Extract<Parameters<EventHandlerListener>[0], { sourceName: string }>;

export type SourceAudioSyncOffsetChanged = Extract<Parameters<EventHandlerListener>[0], { sourceName: string; syncOffset: number }>;

export type SourceAudioMixersChanged = Extract<Parameters<EventHandlerListener>[0], {
  sourceName: string;
  mixers: { id: number; enabled: boolean }[];
  hexMixersValue: string;
}>;

export type SourceRenamed = Extract<Parameters<EventHandlerListener>[0], {
  previousName: string;
  newName: string;
  sourceType: string;
}>;

export type SourceFilterAdded = Extract<Parameters<EventHandlerListener>[0], {
  sourceName: string;
  filterName: string;
  filterType: string;
  filterSettings: {};
}>;

export type SourceFilterRemoved = Extract<Parameters<EventHandlerListener>[0], {
  sourceName: string;
  filterName: string;
  filterType: string;
}>;

export type SourceFilterVisibilityChanged = Extract<Parameters<EventHandlerListener>[0], {
  sourceName: string;
  filterName: string;
  filterEnabled: boolean;
}>;

export type SourceFiltersReordered = Extract<Parameters<EventHandlerListener>[0], {
  sourceName: string;
  filters: { name: string; type: string; enabled: boolean }[];
}>;

export type MediaPlaying = Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

export type MediaPaused = Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

export type MediaRestarted = Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

export type MediaStopped = Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

export type MediaNext = Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

export type MediaPrevious = Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

export type MediaStarted = Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

export type MediaEnded = Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

export type SourceOrderChanged = Extract<Parameters<EventHandlerListener>[0], {
  "scene-name": string;
  "scene-items": { "source-name": string; "item-id": number }[];
}>;

export type SceneItemAdded = Extract<Parameters<EventHandlerListener>[0], {
  "scene-name": string;
  "item-name": string;
  "item-id": number;
}>;

export type SceneItemRemoved = Extract<Parameters<EventHandlerListener>[0], {
  "scene-name": string;
  "item-name": string;
  "item-id": number;
}>;

export type SceneItemVisibilityChanged = Extract<Parameters<EventHandlerListener>[0], {
  "scene-name": string;
  "item-name": string;
  "item-id": number;
  "item-visible": boolean;
}>;

export type SceneItemLockChanged = Extract<Parameters<EventHandlerListener>[0], {
  "scene-name": string;
  "item-name": string;
  "item-id": number;
  "item-locked": boolean;
}>;

export type SceneItemTransformChanged = Extract<Parameters<EventHandlerListener>[0], {
  "scene-name": string;
  "item-name": string;
  "item-id": number;
  transform: ObsWebSocket.SceneItemTransform;
}>;

export type SceneItemSelected = Extract<Parameters<EventHandlerListener>[0], {
  "scene-name": string;
  "item-name": string;
  "item-id": number;
}>;

export type SceneItemDeselected = Extract<Parameters<EventHandlerListener>[0], {
  "scene-name": string;
  "item-name": string;
  "item-id": number;
}>;

export type PreviewSceneChanged = Extract<Parameters<EventHandlerListener>[0], {
  "scene-name": string;
  sources: ObsWebSocket.SceneItem[];
}>;

export type StudioModeSwitched = Extract<Parameters<EventHandlerListener>[0], { "new-state": boolean }>;
