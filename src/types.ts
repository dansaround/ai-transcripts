export interface CaptionInterface  {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    videoId: string;
    lastUpdated: string; // datetime se representa como string en TS
    trackKind: string;
    language: string;
    name: string;
    audioTrackType: string;
    isCC: boolean;
    isLarge: boolean;
    isEasyReader: boolean;
    isDraft: boolean;
    isAutoSynced: boolean;
    status: string;
    failureReason: string;
  }
}

export interface CaptionTrack {
  id: string;
  name: string;
  languageCode: string;
  kind: string;
}

export interface CaptionsResponse {
  items: CaptionInterface[];
}
