import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './components/album/album.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { HomeComponent } from './components/home/home.component';
import { PhotoComponent } from './components/photo/photo.component';
import { PhotosComponent } from './components/photos/photos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'albums',
    component: AlbumsComponent,
  },
  {
    path: 'album/:albumId',
    component: AlbumComponent,
  },
  {
    path: 'album/:albumId/photos',
    component: PhotosComponent,
  },
  {
    path: 'photos',
    component: PhotosComponent,
  },
  {
    path: 'photo/:photoId',
    component: PhotoComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
