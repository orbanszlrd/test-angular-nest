import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { GooglePhotoState } from '../reducers/photo.reducer';

export const selectGooglePhotos = (state: AppState) => state.googlePhotos;

export const selectMediaItems = createSelector(
  selectGooglePhotos,
  (state: GooglePhotoState) => state.mediaItems?.mediaItems
);

export const selectPhotoAlbums = createSelector(
  selectGooglePhotos,
  (state: GooglePhotoState) => state.albums?.albums
);

export const selectAlbumPhotos = createSelector(
  selectGooglePhotos,
  (state: GooglePhotoState) =>
    state.albumPhotos.find((item) => item.albumId === state.currentAlbumId)
);

export const selectIsLoading = createSelector(
  selectGooglePhotos,
  (state: GooglePhotoState) => state.isLoading
);
