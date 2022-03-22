import { createReducer, on } from '@ngrx/store';
import { GoogleMediaItems } from '../../models/google-media-items';
import { GooglePhotoAlbums } from '../../models/google-photo-albums';
import {
  loadAlbums,
  loadAlbumsFailure,
  loadAlbumsSuccess,
  loadPhotos,
  loadPhotosFailure,
  loadPhotosSuccess,
} from '../actions/photo.actions';

export const photoFeatureKey = 'googlePhotos';

export interface GooglePhotoState {
  mediaItems: GoogleMediaItems | undefined;
  albums: GooglePhotoAlbums | undefined;
  isLoading: boolean;
  error: any;
}

export const initialState: GooglePhotoState = {
  mediaItems: undefined,
  albums: undefined,
  isLoading: false,
  error: undefined,
};

export const photoReducer = createReducer(
  initialState,
  on(loadPhotos, (state) => ({ ...state, isLoading: true })),
  on(loadPhotosSuccess, (state, { mediaItems }) => ({
    ...state,
    mediaItems: mediaItems,
    isLoading: false,
    error: undefined,
  })),
  on(loadPhotosFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(loadAlbums, (state) => ({ ...state, isLoading: true })),
  on(loadAlbumsSuccess, (state, { albums }) => ({
    ...state,
    albums: albums,
    isLoading: false,
    error: undefined,
  })),
  on(loadAlbumsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  }))
);
