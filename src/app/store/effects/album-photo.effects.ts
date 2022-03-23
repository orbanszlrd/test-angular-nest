import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import {
  loadAlbumPhotos,
  loadAlbumPhotosFailure,
  loadAlbumPhotosSuccess,
} from '../actions/photo.actions';

import { GooglePhotosService } from '../../services/google-photos.service';
import { GoogleMediaItems } from '../../models/google-media-items';

@Injectable()
export class AlbumPhotoEffects {
  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAlbumPhotos),
      mergeMap((action) =>
        this.googlePhotosService.getAlbumPhotos(action.albumId).pipe(
          map((googleMediaItems: GoogleMediaItems) => ({
            type: loadAlbumPhotosSuccess.type,
            mediaItems: googleMediaItems.mediaItems,
          })),
          catchError((error) =>
            of({ type: loadAlbumPhotosFailure.type, error: error })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private googlePhotosService: GooglePhotosService
  ) {}
}
