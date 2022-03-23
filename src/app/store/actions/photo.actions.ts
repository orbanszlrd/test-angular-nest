import { createAction, props } from '@ngrx/store';
import { GoogleMediaItems, MediaItem } from '../../models/google-media-items';
import { GooglePhotoAlbums } from '../../models/google-photo-albums';

export const loadPhotos = createAction('[Photo] Load Photos');

export const loadPhotosSuccess = createAction(
  '[Photo] Load Photos Success',
  props<{ mediaItems: GoogleMediaItems }>()
);

export const loadPhotosFailure = createAction(
  '[Photo] Load Photos Failure',
  props<{ error: any }>()
);

export const loadAlbums = createAction('[Photo] Load Albums');

export const loadAlbumsSuccess = createAction(
  '[Photo] Load Albums Success',
  props<{ albums: GooglePhotoAlbums }>()
);

export const loadAlbumsFailure = createAction(
  '[Photo] Load Albums Failure',
  props<{ error: any }>()
);

export const setAlbumId = createAction(
  '[Photo] Set Album Id',
  props<{ albumId: string }>()
);

export const loadAlbumPhotos = createAction(
  '[Photo] Load Album Photos',
  props<{ albumId: string }>()
);

export const loadAlbumPhotosSuccess = createAction(
  '[Photo] Load Album Photos Success',
  props<{ mediaItems: MediaItem[] }>()
);

export const loadAlbumPhotosFailure = createAction(
  '[Photo] Load Album Photos Failure',
  props<{ error: any }>()
);
