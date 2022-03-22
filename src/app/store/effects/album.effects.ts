import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import {
  loadAlbums,
  loadAlbumsSuccess,
  loadAlbumsFailure,
} from '../actions/photo.actions';

import { GooglePhotosService } from '../../services/google-photos.service';
import { GooglePhotoAlbums } from '../../models/google-photo-albums';

@Injectable()
export class AlbumEffects {
  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAlbums),
      mergeMap(() =>
        this.googlePhotosService.listAlbums().pipe(
          map((albums: GooglePhotoAlbums) => ({
            type: loadAlbumsSuccess.type,
            albums: albums,
          })),
          catchError((error) =>
            of({ type: loadAlbumsFailure.type, error: error })
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
