import _ from 'lodash';
import ObsWebSocket from 'obs-websocket-js';


const obs = new ObsWebSocket();


type EventHandlerListener = (Parameters<typeof obs.on>)[1];

export type ObsV4EventNames = Extract<(Parameters<typeof obs.on>)[0], string>;

export interface ObsV4EventHandlersData {
  ConnectionOpened: Extract<Parameters<EventHandlerListener>[0], void>;

  ConnectionClosed: Extract<Parameters<EventHandlerListener>[0], void>;
  AuthenticationSuccess: Extract<Parameters<EventHandlerListener>[0], void>;
  AuthenticationFailure: Extract<Parameters<EventHandlerListener>[0], void>;
  error: Extract<Parameters<EventHandlerListener>[0], {
    error: any;
    message: string;
    type: string;
  }>;

  SwitchScenes: Extract<Parameters<EventHandlerListener>[0], { "scene-name": string; sources: ObsWebSocket.SceneItem[] }>;

  ScenesChanged: Extract<Parameters<EventHandlerListener>[0], { scenes: ObsWebSocket.Scene[] }>;

  SceneCollectionChanged: Extract<Parameters<EventHandlerListener>[0], { sceneCollection: string }>;

  SceneCollectionListChanged: Extract<Parameters<EventHandlerListener>[0], { sceneCollections: { name: string }[] }>;

  SwitchTransition: Extract<Parameters<EventHandlerListener>[0], { "transition-name": string }>;

  TransitionListChanged: Extract<Parameters<EventHandlerListener>[0], { transitions: { name: string }[] }>;

  TransitionDurationChanged: Extract<Parameters<EventHandlerListener>[0], { "new-duration": number }>;

  TransitionBegin: Extract<Parameters<EventHandlerListener>[0], {
    name: string;
    type: string;
    duration: number;
    "from-scene"?: string;
    "to-scene": string;
  }>;

  TransitionEnd: Extract<Parameters<EventHandlerListener>[0], {
    name: string;
    type: string;
    duration: number;
    "to-scene": string;
  }>;

  TransitionVideoEnd: Extract<Parameters<EventHandlerListener>[0], {
    name: string;
    type: string;
    duration: number;
    "from-scene"?: string;
    "to-scene": string;
  }>;

  ProfileChanged: Extract<Parameters<EventHandlerListener>[0], { profile: string }>;

  ProfileListChanged: Extract<Parameters<EventHandlerListener>[0], { profiles: { name: string }[] }>;

  StreamStarting: Extract<Parameters<EventHandlerListener>[0], { "preview-only": boolean }>;

  StreamStarted: Extract<Parameters<EventHandlerListener>[0], void>;

  StreamStopping: Extract<Parameters<EventHandlerListener>[0], { "preview-only": boolean }>;

  StreamStopped: Extract<Parameters<EventHandlerListener>[0], void>;

  StreamStatus: Extract<Parameters<EventHandlerListener>[0], {
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

  RecordingStarting: Extract<Parameters<EventHandlerListener>[0], void>;

  RecordingStarted: Extract<Parameters<EventHandlerListener>[0], { recordingFilename: string }>;

  RecordingStopping: Extract<Parameters<EventHandlerListener>[0], { recordingFilename: string }>;

  RecordingStopped: Extract<Parameters<EventHandlerListener>[0], { recordingFilename: string }>;

  RecordingPaused: Extract<Parameters<EventHandlerListener>[0], void>;

  RecordingResumed: Extract<Parameters<EventHandlerListener>[0], void>;

  VirtualCamStarted: Extract<Parameters<EventHandlerListener>[0], void>;

  VirtualCamStopped: Extract<Parameters<EventHandlerListener>[0], void>;

  ReplayStarting: Extract<Parameters<EventHandlerListener>[0], void>;

  ReplayStarted: Extract<Parameters<EventHandlerListener>[0], void>;

  ReplayStopping: Extract<Parameters<EventHandlerListener>[0], void>;

  ReplayStopped: Extract<Parameters<EventHandlerListener>[0], void>;

  Exiting: Extract<Parameters<EventHandlerListener>[0], void>;

  Heartbeat: Extract<Parameters<EventHandlerListener>[0], {
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

  BroadcastCustomMessage: Extract<Parameters<EventHandlerListener>[0], { realm: string; data: {} }>;

  SourceCreated: Extract<Parameters<EventHandlerListener>[0], {
    sourceName: string;
    sourceType: string;
    sourceKind: string;
    sourceSettings: {};
  }>;

  SourceDestroyed: Extract<Parameters<EventHandlerListener>[0], {
    sourceName: string;
    sourceType: string;
    sourceKind: string;
  }>;

  SourceVolumeChanged: Extract<Parameters<EventHandlerListener>[0], {
    sourceName: string;
    volume: number;
    volumeDb: number;
  }>;

  SourceMuteStateChanged: Extract<Parameters<EventHandlerListener>[0], { sourceName: string; muted: boolean }>;

  SourceAudioDeactivated: Extract<Parameters<EventHandlerListener>[0], { sourceName: string }>;

  SourceAudioActivated: Extract<Parameters<EventHandlerListener>[0], { sourceName: string }>;

  SourceAudioSyncOffsetChanged: Extract<Parameters<EventHandlerListener>[0], { sourceName: string; syncOffset: number }>;

  SourceAudioMixersChanged: Extract<Parameters<EventHandlerListener>[0], {
    sourceName: string;
    mixers: { id: number; enabled: boolean }[];
    hexMixersValue: string;
  }>;

  SourceRenamed: Extract<Parameters<EventHandlerListener>[0], {
    previousName: string;
    newName: string;
    sourceType: string;
  }>;

  SourceFilterAdded: Extract<Parameters<EventHandlerListener>[0], {
    sourceName: string;
    filterName: string;
    filterType: string;
    filterSettings: {};
  }>;

  SourceFilterRemoved: Extract<Parameters<EventHandlerListener>[0], {
    sourceName: string;
    filterName: string;
    filterType: string;
  }>;

  SourceFilterVisibilityChanged: Extract<Parameters<EventHandlerListener>[0], {
    sourceName: string;
    filterName: string;
    filterEnabled: boolean;
  }>;

  SourceFiltersReordered: Extract<Parameters<EventHandlerListener>[0], {
    sourceName: string;
    filters: { name: string; type: string; enabled: boolean }[];
  }>;

  MediaPlaying: Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

  MediaPaused: Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

  MediaRestarted: Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

  MediaStopped: Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

  MediaNext: Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

  MediaPrevious: Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

  MediaStarted: Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

  MediaEnded: Extract<Parameters<EventHandlerListener>[0], { sourceName: string; sourceKind: string }>;

  SourceOrderChanged: Extract<Parameters<EventHandlerListener>[0], {
    "scene-name": string;
    "scene-items": { "source-name": string; "item-id": number }[];
  }>;

  SceneItemAdded: Extract<Parameters<EventHandlerListener>[0], {
    "scene-name": string;
    "item-name": string;
    "item-id": number;
  }>;

  SceneItemRemoved: Extract<Parameters<EventHandlerListener>[0], {
    "scene-name": string;
    "item-name": string;
    "item-id": number;
  }>;

  SceneItemVisibilityChanged: Extract<Parameters<EventHandlerListener>[0], {
    "scene-name": string;
    "item-name": string;
    "item-id": number;
    "item-visible": boolean;
  }>;

  SceneItemLockChanged: Extract<Parameters<EventHandlerListener>[0], {
    "scene-name": string;
    "item-name": string;
    "item-id": number;
    "item-locked": boolean;
  }>;

  SceneItemTransformChanged: Extract<Parameters<EventHandlerListener>[0], {
    "scene-name": string;
    "item-name": string;
    "item-id": number;
    transform: ObsWebSocket.SceneItemTransform;
  }>;

  SceneItemSelected: Extract<Parameters<EventHandlerListener>[0], {
    "scene-name": string;
    "item-name": string;
    "item-id": number;
  }>;

  SceneItemDeselected: Extract<Parameters<EventHandlerListener>[0], {
    "scene-name": string;
    "item-name": string;
    "item-id": number;
  }>;

  PreviewSceneChanged: Extract<Parameters<EventHandlerListener>[0], {
    "scene-name": string;
    sources: ObsWebSocket.SceneItem[];
  }>;

  StudioModeSwitched: Extract<Parameters<EventHandlerListener>[0], { "new-state": boolean }>;
}