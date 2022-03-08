import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PhotosService {
  constructor(private httpService: HttpService) {}

  async listAlbums(bearerToken: string) {
    const result = await lastValueFrom(
      this.httpService.get('https://photoslibrary.googleapis.com/v1/albums', {
        params: {
          pageSize: 50,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken,
        },
      })
    );

    return result.data;
  }

  async getAlbum(bearerToken: string, albumId: string) {
    const result = await lastValueFrom(
      this.httpService.get(
        `https://photoslibrary.googleapis.com/v1/albums/${albumId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken,
          },
        }
      )
    );

    return result.data;
  }
}
