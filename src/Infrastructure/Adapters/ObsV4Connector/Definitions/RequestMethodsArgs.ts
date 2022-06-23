import ObsWebSocket from "obs-websocket-js";

const obs = new ObsWebSocket();



type RequestFullParams = Exclude<Parameters<typeof obs.send>[1], undefined>;
type ObsV4RequestMessageFormats = (Parameters<RequestFullParams>[0]);


export interface ObsV4Requests 
{
    GetVersion: Extract<ObsV4RequestMessageFormats, void>;

    GetAuthRequired: Extract<ObsV4RequestMessageFormats, void>;

    Authenticate: Extract<ObsV4RequestMessageFormats, { auth: string }>;

    SetHeartbeat: Extract<ObsV4RequestMessageFormats, { enable: boolean }>;

    SetFilenameFormatting: Extract<ObsV4RequestMessageFormats, { "filename-formatting": string }>;

    GetFilenameFormatting: Extract<ObsV4RequestMessageFormats, void>;

    GetStats: Extract<ObsV4RequestMessageFormats, void>;

    BroadcastCustomMessage: Extract<ObsV4RequestMessageFormats, { realm: string; data: {} }>;

    GetVideoInfo: Extract<ObsV4RequestMessageFormats, void>;

    OpenProjector: Extract<ObsV4RequestMessageFormats, {
      type?: string;
      monitor?: number;
      geometry?: string;
      name?: string;
    }>;

    TriggerHotkeyByName: Extract<ObsV4RequestMessageFormats, { hotkeyName: string }>;

    TriggerHotkeyBySequence: Extract<ObsV4RequestMessageFormats, {
      keyId: string;
      keyModifiers?: {
        shift: boolean;
        alt: boolean;
        control: boolean;
        command: boolean;
      };
    }>;

    ExecuteBatch: Extract<ObsV4RequestMessageFormats, {
      requests: {
        "request-type": string;
        "message-id"?: string;
        [k: string]: any;
      }[];
      abortOnFail?: boolean;
    }>;

    Sleep: Extract<ObsV4RequestMessageFormats, { sleepMillis: number }>;

    PlayPauseMedia: Extract<ObsV4RequestMessageFormats, { sourceName: string; playPause: boolean }>;

    RestartMedia: Extract<ObsV4RequestMessageFormats, { sourceName: string }>;

    StopMedia: Extract<ObsV4RequestMessageFormats, { sourceName: string }>;

    NextMedia: Extract<ObsV4RequestMessageFormats, { sourceName: string }>;

    PreviousMedia: Extract<ObsV4RequestMessageFormats, { sourceName: string }>;

    GetMediaDuration: Extract<ObsV4RequestMessageFormats, { sourceName: string }>;

    GetMediaTime: Extract<ObsV4RequestMessageFormats, { sourceName: string }>;

    SetMediaTime: Extract<ObsV4RequestMessageFormats, { sourceName: string; timestamp: number }>;

    ScrubMedia: Extract<ObsV4RequestMessageFormats, { sourceName: string; timeOffset: number }>;

    GetMediaState: Extract<ObsV4RequestMessageFormats, { sourceName: string }>;

    GetMediaSourcesList: Extract<ObsV4RequestMessageFormats, void>;

    CreateSource: Extract<ObsV4RequestMessageFormats, {
      sourceName: string;
      sourceKind: string;
      sceneName: string;
      sourceSettings?: {};
      setVisible?: boolean;
    }>;

    GetSourcesList: Extract<ObsV4RequestMessageFormats, void>;

    GetSourceTypesList: Extract<ObsV4RequestMessageFormats, void>;

    GetVolume: Extract<ObsV4RequestMessageFormats, { source: string; useDecibel?: boolean }>;

    SetVolume: Extract<ObsV4RequestMessageFormats, { source: string; volume: number; useDecibel?: boolean }>;

    SetTracks: Extract<ObsV4RequestMessageFormats, { sourceName: string; track: number; active: boolean }>;

    GetTracks: Extract<ObsV4RequestMessageFormats, { sourceName: string }>;

    GetMute: Extract<ObsV4RequestMessageFormats, { source: string }>;

    SetMute: Extract<ObsV4RequestMessageFormats, { source: string; mute: boolean }>;

    ToggleMute: Extract<ObsV4RequestMessageFormats, { source: string }>;

    GetSourceActive: Extract<ObsV4RequestMessageFormats, { sourceName: string }>;

    GetAudioActive: Extract<ObsV4RequestMessageFormats, { sourceName: string }>;

    SetSourceName: Extract<ObsV4RequestMessageFormats, { sourceName: string; newName: string }>;

    SetSyncOffset: Extract<ObsV4RequestMessageFormats, { source: string; offset: number }>;

    GetSyncOffset: Extract<ObsV4RequestMessageFormats, { source: string }>;

    GetSourceSettings: Extract<ObsV4RequestMessageFormats, { sourceName: string; sourceType?: string }>;

    SetSourceSettings: Extract<ObsV4RequestMessageFormats, {
      sourceName: string;
      sourceType?: string;
      sourceSettings: {};
    }>;

    GetTextGDIPlusProperties: Extract<ObsV4RequestMessageFormats, { source: string }>;

    SetTextGDIPlusProperties: Extract<ObsV4RequestMessageFormats, {
      source: string;
      align?: string;
      bk_color?: number;
      bk_opacity?: number;
      chatlog?: boolean;
      chatlog_lines?: number;
      color?: number;
      extents?: boolean;
      extents_cx?: number;
      extents_cy?: number;
      file?: string;
      read_from_file?: boolean;
      font?: { face?: string; flags?: number; size?: number; style?: string };
      gradient?: boolean;
      gradient_color?: number;
      gradient_dir?: number;
      gradient_opacity?: number;
      outline?: boolean;
      outline_color?: number;
      outline_size?: number;
      outline_opacity?: number;
      text?: string;
      valign?: string;
      vertical?: boolean;
      render?: boolean;
    }>;

    GetTextFreetype2Properties: Extract<ObsV4RequestMessageFormats, { source: string }>;

    SetTextFreetype2Properties: Extract<ObsV4RequestMessageFormats, {
      source: string;
      color1?: number;
      color2?: number;
      custom_width?: number;
      drop_shadow?: boolean;
      font?: { face?: string; flags?: number; size?: number; style?: string };
      from_file?: boolean;
      log_mode?: boolean;
      outline?: boolean;
      text?: string;
      text_file?: string;
      word_wrap?: boolean;
    }>;

    GetBrowserSourceProperties: Extract<ObsV4RequestMessageFormats, { source: string }>;

    SetBrowserSourceProperties: Extract<ObsV4RequestMessageFormats, {
      source: string;
      is_local_file?: boolean;
      local_file?: string;
      url?: string;
      css?: string;
      width?: number;
      height?: number;
      fps?: number;
      shutdown?: boolean;
      render?: boolean;
    }>;

    GetSpecialSources: Extract<ObsV4RequestMessageFormats, void>;

    GetSourceFilters: Extract<ObsV4RequestMessageFormats, { sourceName: string }>;

    GetSourceFilterInfo: Extract<ObsV4RequestMessageFormats, { sourceName: string; filterName: string }>;

    AddFilterToSource: Extract<ObsV4RequestMessageFormats, {
      sourceName: string;
      filterName: string;
      filterType: string;
      filterSettings: {};
    }>;

    RemoveFilterFromSource: Extract<ObsV4RequestMessageFormats, { sourceName: string; filterName: string }>;

    ReorderSourceFilter: Extract<ObsV4RequestMessageFormats, {
      sourceName: string;
      filterName: string;
      newIndex: number;
    }>;

    MoveSourceFilter: Extract<ObsV4RequestMessageFormats, {
      sourceName: string;
      filterName: string;
      movementType: string;
    }>;

    SetSourceFilterSettings: Extract<ObsV4RequestMessageFormats, {
      sourceName: string;
      filterName: string;
      filterSettings: {};
    }>;

    SetSourceFilterVisibility: Extract<ObsV4RequestMessageFormats, {
      sourceName: string;
      filterName: string;
      filterEnabled: boolean;
    }>;

    GetAudioMonitorType: Extract<ObsV4RequestMessageFormats, { sourceName: string }>;

    SetAudioMonitorType: Extract<ObsV4RequestMessageFormats, { sourceName: string; monitorType: string }>;

    GetSourceDefaultSettings: Extract<ObsV4RequestMessageFormats, { sourceKind: string }>;

    TakeSourceScreenshot: Extract<ObsV4RequestMessageFormats, {
      sourceName?: string;
      embedPictureFormat?: string;
      saveToFilePath?: string;
      fileFormat?: string;
      compressionQuality?: number;
      width?: number;
      height?: number;
    }>;

    RefreshBrowserSource: Extract<ObsV4RequestMessageFormats, { sourceName: string }>;

    ListOutputs: Extract<ObsV4RequestMessageFormats, void>;

    GetOutputInfo: Extract<ObsV4RequestMessageFormats, { outputName: string }>;

    StartOutput: Extract<ObsV4RequestMessageFormats, { outputName: string }>;

    StopOutput: Extract<ObsV4RequestMessageFormats, { outputName: string; force?: boolean }>;

    SetCurrentProfile: Extract<ObsV4RequestMessageFormats, { "profile-name": string }>;

    GetCurrentProfile: Extract<ObsV4RequestMessageFormats, void>;

    ListProfiles: Extract<ObsV4RequestMessageFormats, void>;

    GetRecordingStatus: Extract<ObsV4RequestMessageFormats, void>;

    StartStopRecording: Extract<ObsV4RequestMessageFormats, void>;

    StartRecording: Extract<ObsV4RequestMessageFormats, void>;

    StopRecording: Extract<ObsV4RequestMessageFormats, void>;

    PauseRecording: Extract<ObsV4RequestMessageFormats, void>;

    ResumeRecording: Extract<ObsV4RequestMessageFormats, void>;

    SetRecordingFolder: Extract<ObsV4RequestMessageFormats, { "rec-folder": string }>;

    GetRecordingFolder: Extract<ObsV4RequestMessageFormats, void>;

    GetReplayBufferStatus: Extract<ObsV4RequestMessageFormats, void>;

    StartStopReplayBuffer: Extract<ObsV4RequestMessageFormats, void>;

    StartReplayBuffer: Extract<ObsV4RequestMessageFormats, void>;

    StopReplayBuffer: Extract<ObsV4RequestMessageFormats, void>;

    SaveReplayBuffer: Extract<ObsV4RequestMessageFormats, void>;

    SetCurrentSceneCollection: Extract<ObsV4RequestMessageFormats, { "sc-name": string }>;

    GetCurrentSceneCollection: Extract<ObsV4RequestMessageFormats, void>;

    ListSceneCollections: Extract<ObsV4RequestMessageFormats, void>;

    GetSceneItemList: Extract<ObsV4RequestMessageFormats, { sceneName?: string }>;

    GetSceneItemProperties: Extract<ObsV4RequestMessageFormats, {
      "scene-name"?: string;
      item: { name?: string; id?: number };
    }>;

    SetSceneItemProperties: Extract<ObsV4RequestMessageFormats, {
      "scene-name"?: string;
      item: { name?: string; id?: number };
      rotation?: number;
      visible?: boolean;
      locked?: boolean;
      position: { x?: number; y?: number; alignment?: number };
      scale: { x?: number; y?: number; filter?: string };
      crop: { top?: number; bottom?: number; left?: number; right?: number };
      bounds: { type?: string; alignment?: number; x?: number; y?: number };
    }>;

    ResetSceneItem: Extract<ObsV4RequestMessageFormats, {
      "scene-name"?: string;
      item: { name?: string; id?: number };
    }>;

    SetSceneItemRender: Extract<ObsV4RequestMessageFormats, {
      "scene-name"?: string;
      source?: string;
      item?: number;
      render: boolean;
    }>;

    SetSceneItemPosition: Extract<ObsV4RequestMessageFormats, {
      "scene-name"?: string;
      item: string;
      x: number;
      y: number;
    }>;

    SetSceneItemTransform: Extract<ObsV4RequestMessageFormats, {
      "scene-name"?: string;
      item: string;
      "x-scale": number;
      "y-scale": number;
      rotation: number;
    }>;

    SetSceneItemCrop: Extract<ObsV4RequestMessageFormats, {
      "scene-name"?: string;
      item: string;
      top: number;
      bottom: number;
      left: number;
      right: number;
    }>;

    DeleteSceneItem: Extract<ObsV4RequestMessageFormats, { scene?: string; item: { name: string; id: number } }>;

    AddSceneItem: Extract<ObsV4RequestMessageFormats, {
      sceneName: string;
      sourceName: string;
      setVisible?: boolean;
    }>;

    DuplicateSceneItem: Extract<ObsV4RequestMessageFormats, {
      fromScene?: string;
      toScene?: string;
      item: { name: string; id: number };
    }>;

    SetCurrentScene: Extract<ObsV4RequestMessageFormats, { "scene-name": string }>;

    GetCurrentScene: Extract<ObsV4RequestMessageFormats, void>;

    GetSceneList: Extract<ObsV4RequestMessageFormats, void>;

    CreateScene: Extract<ObsV4RequestMessageFormats, { sceneName: string }>;

    ReorderSceneItems: Extract<ObsV4RequestMessageFormats, {
      scene?: string;
      items: { id?: number; name?: string }[];
    }>;

    SetSceneTransitionOverride: Extract<ObsV4RequestMessageFormats, {
      sceneName: string;
      transitionName: string;
      transitionDuration?: number;
    }>;

    RemoveSceneTransitionOverride: Extract<ObsV4RequestMessageFormats, { sceneName: string }>;

    GetSceneTransitionOverride: Extract<ObsV4RequestMessageFormats, { sceneName: string }>;

    GetStreamingStatus: Extract<ObsV4RequestMessageFormats, void>;

    StartStopStreaming: Extract<ObsV4RequestMessageFormats, void>;

    StartStreaming: Extract<ObsV4RequestMessageFormats, {
      stream?: {
        type?: string;
        metadata?: {};
        settings?: {
          server?: string;
          key?: string;
          use_auth?: boolean;
          username?: string;
          password?: string;
        };
      };
    }>;

    StopStreaming: Extract<ObsV4RequestMessageFormats, void>;

    SetStreamSettings: Extract<ObsV4RequestMessageFormats, {
      type: string;
      settings: {
        server?: string;
        key?: string;
        use_auth?: boolean;
        username?: string;
        password?: string;
      };
      save: boolean;
    }>;

    GetStreamSettings: Extract<ObsV4RequestMessageFormats, void>;

    SaveStreamSettings: Extract<ObsV4RequestMessageFormats, void>;

    SendCaptions: Extract<ObsV4RequestMessageFormats, { text: string }>;

    GetStudioModeStatus: Extract<ObsV4RequestMessageFormats, void>;

    GetPreviewScene: Extract<ObsV4RequestMessageFormats, void>;

    SetPreviewScene: Extract<ObsV4RequestMessageFormats, { "scene-name": string }>;

    TransitionToProgram: Extract<ObsV4RequestMessageFormats, {
      "with-transition"?: { name: string; duration?: number };
    }>;

    EnableStudioMode: Extract<ObsV4RequestMessageFormats, void>;

    DisableStudioMode: Extract<ObsV4RequestMessageFormats, void>;

    ToggleStudioMode: Extract<ObsV4RequestMessageFormats, void>;

    GetTransitionList: Extract<ObsV4RequestMessageFormats, void>;

    GetCurrentTransition: Extract<ObsV4RequestMessageFormats, void>;

    SetCurrentTransition: Extract<ObsV4RequestMessageFormats, { "transition-name": string }>;

    SetTransitionDuration: Extract<ObsV4RequestMessageFormats, { duration: number }>;

    GetTransitionDuration: Extract<ObsV4RequestMessageFormats, void>;

    GetTransitionPosition: Extract<ObsV4RequestMessageFormats, void>;

    GetTransitionSettings: Extract<ObsV4RequestMessageFormats, { transitionName: string }>;

    SetTransitionSettings: Extract<ObsV4RequestMessageFormats, { transitionName: string; transitionSettings: {} }>;

    ReleaseTBar: Extract<ObsV4RequestMessageFormats, void>;

    SetTBarPosition: Extract<ObsV4RequestMessageFormats, { position: number; release?: boolean }>;

    GetVirtualCamStatus: Extract<ObsV4RequestMessageFormats, void>;

    StartStopVirtualCam: Extract<ObsV4RequestMessageFormats, void>;

    StartVirtualCam: Extract<ObsV4RequestMessageFormats, void>;

    StopVirtualCam: Extract<ObsV4RequestMessageFormats, void>;


}

export type ObsV4RequestNames = Extract<(Parameters<typeof obs.send>)[0], keyof ObsV4Requests>;
