import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import {
  loadPhotos,
  loadPhotosSuccess,
  loadPhotosFailure,
} from '../actions/photo.actions';

import { GooglePhotosService } from '../../services/google-photos.service';
import { GoogleMediaItems } from '../../models/google-media-items';

@Injectable()
export class PhotoEffects {
  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPhotos),
      mergeMap(() =>
        this.googlePhotosService.listMediaItems().pipe(
          map((mediaItems: GoogleMediaItems) => ({
            type: loadPhotosSuccess.type,
            mediaItems: mediaItems,
          })),
          catchError((error) =>
            of({ type: loadPhotosFailure.type, error: error })
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
