import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMediaItems } from '../google-media-items';
import { GooglePhotosService } from '../google-photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  nameFilter: string = '';

  mediaItems: GoogleMediaItems | any = [];

  constructor(private readonly photoService: GooglePhotosService) {}

  filter() {
    console.log(this.nameFilter);
  }

  ngOnInit(): void {
    this.photoService.listMediaItems().subscribe((data) => {
      this.mediaItems = data.mediaItems;
    });
  }
}
