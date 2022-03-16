import { Controller, Get, Param, Headers } from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get('photos/list')
  listMediaItems(@Headers('authorization') bearerToken: string) {
    return this.photosService.listMediaItems(bearerToken);
  }

  @Get('photos/search')
  searchMediaItems(@Headers('authorization') bearerToken: string) {
    return this.photosService.searchMediaItems(bearerToken);
  }

  @Get('photos/:mediaItemId')
  getMediaItem(
    @Headers('authorization') bearerToken: string,
    @Param('mediaItemId') mediaItemId: string
  ) {
    return this.photosService.getMediaItem(bearerToken, mediaItemId);
  }

  @Get('albums')
  listAlbums(@Headers('authorization') bearerToken: string) {
    return this.photosService.listAlbums(bearerToken);
  }

  @Get('albums/:albumId')
  getAlbum(
    @Headers('authorization') bearerToken: string,
    @Param('albumId') albumId: string
  ) {
    return this.photosService.getAlbum(bearerToken, albumId);
  }
}
