import { Component, OnInit } from '@angular/core';
import { Album, GooglePhotoAlbums } from '../google-photo-albums';
import { GooglePhotosService } from '../google-photos.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  constructor(private readonly photoService: GooglePhotosService) {}

  albums: GooglePhotoAlbums | any = [];
  items: GooglePhotoAlbums | any = [];

  filterText: string = '';

  ngOnInit(): void {
    this.photoService.listAlbums().subscribe((data) => {
      this.albums = data.albums;
      this.items = data.albums;
    });
  }

  filterData(): void {
    this.items = this.albums.filter((album: Album) => {
      return album.title.toLowerCase().includes(this.filterText.toLowerCase());
    });
  }
}
