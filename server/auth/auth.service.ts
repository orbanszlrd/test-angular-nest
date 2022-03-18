import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly url = 'https://www.googleapis.com/oauth2/v4/token';

  constructor(private httpService: HttpService) {}

  async getToken() {
    const result = await lastValueFrom(
      this.httpService
        .post(this.url, {
          client_id: process.env['GOOGLE_CLIENT_ID'],
          client_secret: process.env['GOOGLE_CLIENT_SECRET'],
          refresh_token: process.env['GOOGLE_REFRESH_TOKEN'],
          grant_type: process.env['GOOGLE_GRANT_TYPE'] ?? 'refresh_token',
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
