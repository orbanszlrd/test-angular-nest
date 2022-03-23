import { Controller, Get, Param } from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get('photos/list')
  listMediaItems() {
    return this.photosService.listMediaItems();
  }

  @Get('photos/search')
  searchMediaItems() {
    return this.photosService.searchMediaItems();
  }

  @Get('photos/:mediaItemId')
  getMediaItem(@Param('mediaItemId') mediaItemId: string) {
    return this.photosService.getMediaItem(mediaItemId);
  }

  @Get('albums')
  listAlbums() {
    return this.photosService.listAlbums();
  }

  @Get('albums/:albumId')
  getAlbum(@Param('albumId') albumId: string) {
    return this.photosService.getAlbum(albumId);
  }

  @Get('albums/:albumId/photos')
  getAlbumPhotos(@Param('albumId') albumId: string) {
    return this.photosService.getAlbumPhotos(albumId);
  }
}
