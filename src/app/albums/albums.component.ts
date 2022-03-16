import { Component, OnInit } from '@angular/core';
import { GooglePhotoAlbums } from '../google-photo-albums';
import { GooglePhotosService } from '../google-photos.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  constructor(private readonly photoService: GooglePhotosService) {}

  albums: GooglePhotoAlbums | any = [];

  ngOnInit(): void {
    this.photoService.listAlbums().subscribe((data) => {
      this.albums = data.albums;
    });
  }
}
