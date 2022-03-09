import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PhotosService {
  baseUrl = 'https://photoslibrary.googleapis.com/v1';

  constructor(private httpService: HttpService) {}

  async listMediaItems(bearerToken: string) {
    const result = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/mediaItems`, {
        headers: {
          Authorization: bearerToken,
        },
      })
    );

    return result.data;
  }

  async searchMediaItems(bearerToken: string) {
    const result = await lastValueFrom(
      this.httpService.post(
        `${this.baseUrl}/mediaItems:search`,
        {
          filters: {
            mediaTypeFilter: {
              mediaTypes: ['PHOTO'],
            },
          },
          pageSize: 50,
        },
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      )
    );

    return result.data;
  }

  async getMediaItem(bearerToken: string, mediaItemId: string) {
    const result = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/mediaItems/${mediaItemId}`, {
        headers: {
          Authorization: bearerToken,
        },
      })
    );

    return result.data;
  }

  async listAlbums(bearerToken: string) {
    const result = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/albums`, {
        params: {
          pageSize: 50,
        },
        headers: {
          Authorization: bearerToken,
        },
      })
    );

    return result.data;
  }

  async getAlbum(bearerToken: string, albumId: string) {
    const result = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/albums/${albumId}`, {
        headers: {
          Authorization: bearerToken,
        },
      })
    );

    return result.data;
  }
}
