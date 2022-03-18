import { Component, HostListener, OnInit } from '@angular/core';
import { MediaItem } from '../google-media-items';
import { GooglePhotosService } from '../google-photos.service';
import { JustifiedLayoutService } from '../justified-layout.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  isLoading = true;
  mediaItems: MediaItem[] = [];
  items: MediaItem[] = [];
  filterText: string = '';

  photoBoxes: {
    containerHeight: number;
    boxes: any[];
  } = {
    containerHeight: 0,
    boxes: [],
  };

  constructor(
    private readonly photoService: GooglePhotosService,
    private readonly justifiedLayoutService: JustifiedLayoutService
  ) {}

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(_: Event) {
    setTimeout(() => {
      this.resizeBoxes();
    }, 10);
  }

  @HostListener('window:resize', ['$event'])
  onResize(_: Event) {
    this.resizeBoxes();
  }

  getContainerStyle(): string {
    return 'height:' + this.photoBoxes.containerHeight + 'px;';
  }

  getBoxStyle(i: number): string {
    if (!this.photoBoxes.boxes[i]) return '';

    return (
      'top: ' +
      this.photoBoxes.boxes[i].top +
      'px; left: ' +
      this.photoBoxes.boxes[i].left +
      'px; width: ' +
      this.photoBoxes.boxes[i].width +
      'px; height: ' +
      this.photoBoxes.boxes[i].height +
      'px;'
    );
  }

  filterData(): void {
    this.items = this.mediaItems.filter((item: MediaItem) => {
      return item.filename
        .toLowerCase()
        .includes(this.filterText.toLowerCase());
    });
  }

  resizeBoxes() {
    this.photoBoxes = this.justifiedLayoutService.getBoxSizes(this.items);
  }

  ngOnInit(): void {
    this.photoService.listMediaItems().subscribe((data) => {
      this.mediaItems = data.mediaItems;
      this.items = data.mediaItems;
      this.photoBoxes = this.justifiedLayoutService.getBoxSizes(this.items);
      this.isLoading = false;
    });
  }
}
