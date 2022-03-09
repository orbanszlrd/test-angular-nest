import {
  Controller,
  Get,
  Param,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get('photos/list')
  listMediaItems(@Headers('authorization') bearerToken: string) {
    if (bearerToken === undefined) {
      throw new UnauthorizedException();
    }

    return this.photosService.listMediaItems(bearerToken);
  }

  @Get('photos/search')
  searchMediaItems(@Headers('authorization') bearerToken: string) {
    if (bearerToken === undefined) {
      throw new UnauthorizedException();
    }

    return this.photosService.searchMediaItems(bearerToken);
  }

  @Get('photos/:mediaItemId')
  getMediaItem(
    @Headers('authorization') bearerToken: string,
    @Param('mediaItemId') mediaItemId: string
  ) {
    if (bearerToken === undefined) {
      throw new UnauthorizedException();
    }

    return this.photosService.getMediaItem(bearerToken, mediaItemId);
  }

  @Get('albums')
  listAlbums(@Headers('authorization') bearerToken: string) {
    if (bearerToken === undefined) {
      throw new UnauthorizedException();
    }

    return this.photosService.listAlbums(bearerToken);
  }

  @Get('albums/:albumId')
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
