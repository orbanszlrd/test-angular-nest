import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class PhotosService {
  baseUrl = 'https://photoslibrary.googleapis.com/v1';
  pageSize = 50;

  constructor(private httpService: HttpService) {}

  async listMediaItems(bearerToken: string) {
    const result = await lastValueFrom(
      this.httpService
        .get(`${this.baseUrl}/mediaItems`, {
          params: {
            pageSize: this.pageSize,
          },
          headers: {
            Authorization: bearerToken || '',
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

  async searchMediaItems(bearerToken: string) {
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
              Authorization: bearerToken || '',
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

  async getMediaItem(bearerToken: string, mediaItemId: string) {
    const result = await lastValueFrom(
      this.httpService
        .get(`${this.baseUrl}/mediaItems/${mediaItemId}`, {
          headers: {
            Authorization: bearerToken || '',
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

  async listAlbums(bearerToken: string) {
    const result = await lastValueFrom(
      this.httpService
        .get(`${this.baseUrl}/albums`, {
          params: {
            pageSize: this.pageSize,
          },
          headers: {
            Authorization: bearerToken || '',
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

  async getAlbum(bearerToken: string, albumId: string) {
    const result = await lastValueFrom(
      this.httpService
        .get(`${this.baseUrl}/albums/${albumId}`, {
          headers: {
            Authorization: bearerToken,
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
