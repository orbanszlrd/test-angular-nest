import {
  Controller,
  Get,
  Param,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  listAlbums(@Headers('authorization') bearerToken: string) {
    if (bearerToken === undefined) {
      throw new UnauthorizedException();
    }

    return this.photosService.listAlbums(bearerToken);
  }

  @Get(':albumId')
  getAlbum(
    @Headers('authorization') bearerToken: string,
    @Param('albumId') albumId: string
  ) {
    if (bearerToken === undefined) {
      throw new UnauthorizedException();
    }

    return this.photosService.getAlbum(bearerToken, albumId);
  }
}
