import { createReducer, on } from '@ngrx/store';
import { GoogleMediaItems, MediaItem } from '../../models/google-media-items';
import { GooglePhotoAlbums } from '../../models/google-photo-albums';
import {
  loadAlbumPhotos,
  loadAlbumPhotosFailure,
  loadAlbumPhotosSuccess,
  loadAlbums,
  loadAlbumsFailure,
  loadAlbumsSuccess,
  loadPhotos,
  loadPhotosFailure,
  loadPhotosSuccess,
  setAlbumId,
} from '../actions/photo.actions';

export const photoFeatureKey = 'googlePhotos';

export interface GooglePhotoState {
  mediaItems: GoogleMediaItems | undefined;
  albums: GooglePhotoAlbums | undefined;
  albumPhotos: { albumId: string; mediaItems: MediaItem[] }[];
  currentAlbumId: string | undefined;
  isLoading: boolean;
  error: any;
}

export const initialState: GooglePhotoState = {
  mediaItems: undefined,
  albums: undefined,
  albumPhotos: [],
  currentAlbumId: undefined,
  isLoading: false,
  error: undefined,
};

const loadFailure = (state: GooglePhotoState, props: { error: any }) => ({
  ...state,
  isLoading: false,
  error: props.error,
});

export const photoReducer = createReducer(
  initialState,
  on(loadPhotos, (state) => ({
    ...state,
    isLoading: true,
    currentAlbumId: undefined,
  })),
  on(loadPhotosSuccess, (state, { mediaItems }) => ({
    ...state,
    mediaItems: mediaItems,
    isLoading: false,
    error: undefined,
  })),
  on(loadPhotosFailure, loadFailure),
  on(loadAlbums, (state) => ({
    ...state,
    isLoading: true,
    currentAlbumId: undefined,
  })),
  on(loadAlbumsSuccess, (state, { albums }) => ({
    ...state,
    albums: albums,
    isLoading: false,
    error: undefined,
  })),
  on(loadAlbumsFailure, loadFailure),
  on(loadAlbumPhotos, (state, { albumId }) => ({
    ...state,
    isLoading: true,
    currentAlbumId: albumId,
  })),
  on(setAlbumId, (state, { albumId }) => ({
    ...state,
    currentAlbumId: albumId,
  })),
  on(loadAlbumPhotosSuccess, (state, { mediaItems }) => ({
    ...state,
    albumPhotos:
      state.currentAlbumId &&
      state.albumPhotos.find((item) => item.albumId == state.currentAlbumId) ===
        undefined
        ? [
            ...state.albumPhotos,
            { albumId: state.currentAlbumId, mediaItems: mediaItems },
          ]
        : state.albumPhotos,
    isLoading: false,
    error: undefined,
  })),
  on(loadAlbumPhotosFailure, loadFailure)
);
