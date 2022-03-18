import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { AuthService } from 'server/auth/auth.service';

@Injectable()
export class PhotosService {
  baseUrl = 'https://photoslibrary.googleapis.com/v1';
  pageSize = 50;

  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService
  ) {}

  private async getBearerToken() {
    const data = await this.authService.getToken();

    if (data && data.access_token) {
      return `Bearer ${data.access_token}`;
    }

    return '';
  }

  async listMediaItems() {
    const result = await lastValueFrom(
      this.httpService
        .get(`${this.baseUrl}/mediaItems`, {
          params: {
            pageSize: this.pageSize,
          },
          headers: {
            Authorization: await this.getBearerToken(),
          },
        })
        .pipe(
          catchError((e) => {
            throw new HttpException(e.response.data, e.response.status);
          })
        )
    );

    return result.data;
  }

  async searchMediaItems() {
    const result = await lastValueFrom(
      this.httpService
        .post(
          `${this.baseUrl}/mediaItems:search`,
          {
            filters: {
              mediaTypeFilter: {
                mediaTypes: ['PHOTO'],
              },
            },
            pageSize: this.pageSize,
          },
          {
            headers: {
              Authorization: await this.getBearerToken(),
            },
          }
        )
        .pipe(
          catchError((e) => {
            throw new HttpException(e.response.data, e.response.status);
          })
        )
    );

    return result.data;
  }

  async getMediaItem(mediaItemId: string) {
    const result = await lastValueFrom(
      this.httpService
        .get(`${this.baseUrl}/mediaItems/${mediaItemId}`, {
          headers: {
            Authorization: await this.getBearerToken(),
          },
        })
        .pipe(
          catchError((e) => {
            throw new HttpException(e.response.data, e.response.status);
          })
        )
    );

    return result.data;
  }

  async listAlbums() {
    const result = await lastValueFrom(
      this.httpService
        .get(`${this.baseUrl}/albums`, {
          params: {
            pageSize: this.pageSize,
          },
          headers: {
            Authorization: await this.getBearerToken(),
          },
        })
        .pipe(
          catchError((e) => {
            throw new HttpException(e.response.data, e.response.status);
          })
        )
    );

    return result.data;
  }

  async getAlbum(albumId: string) {
    const result = await lastValueFrom(
      this.httpService
        .get(`${this.baseUrl}/albums/${albumId}`, {
          headers: {
            Authorization: await this.getBearerToken(),
          },
        })
        .pipe(
          catchError((e) => {
            throw new HttpException(e.response.data, e.response.status);
          })
        )
    );

    return result.data;
  }
}
