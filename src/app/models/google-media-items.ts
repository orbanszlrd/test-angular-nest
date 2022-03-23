export interface Photo {
  cameraMake: string;
  cameraModel: string;
  focalLength: number;
  apertureFNumber: number;
  isoEquivalent: number;
  exposureTime: string;
}

export interface MediaMetadata {
  creationTime: Date;
  width: string;
  height: string;
  photo: Photo;
}

export interface MediaItem {
  id: string;
  productUrl: string;
  baseUrl: string;
  mimeType: string;
  mediaMetadata: MediaMetadata;
  filename: string;
}

export interface GoogleMediaItems {
  mediaItems: MediaItem[];
  nextPageToken?: string;
}
