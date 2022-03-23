import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GoogleMediaItems } from '../models/google-media-items';
import { GooglePhotoAlbums } from '../models/google-photo-albums';

@Injectable({
  providedIn: 'root',
})
export class GooglePhotosService {
  options: object;

  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService
  ) {
    const token = this.cookieService.get('access_token');

    this.options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  listMediaItems(): Observable<GoogleMediaItems | any> {
    return this.http.get(`/api/photos/list`, this.options);
  }

  searchMediaItems(): Observable<GoogleMediaItems | any> {
    return this.http.get(`/api/photos/search`, this.options);
  }

  getMediaItem(mediaItemId: string) {
    return this.http.get(`/api/photos/${mediaItemId}`, this.options);
  }

  listAlbums(): Observable<GooglePhotoAlbums | any> {
    return this.http.get(`/api/albums`, this.options);
  }

  getAlbum(albumId: string) {
    return this.http.get(`/api/albums/${albumId}`, this.options);
  }

  getAlbumPhotos(albumId: string): Observable<GoogleMediaItems | any> {
    return this.http.get(`/api/albums/${albumId}/photos`, this.options);
  }
}
