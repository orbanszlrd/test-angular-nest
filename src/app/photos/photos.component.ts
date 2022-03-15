import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  nameFilter: string = '';

  constructor() {}

  filter() {
    console.log(this.nameFilter);
  }

  ngOnInit(): void {}
}
