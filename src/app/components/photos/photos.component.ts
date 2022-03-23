import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MediaItem } from '../../models/google-media-items';
import { JustifiedLayoutService } from '../../services/justified-layout.service';
import { AppState } from '../../store/app.state';
import {
  loadAlbumPhotos,
  loadPhotos,
  setAlbumId,
} from '../../store/actions/photo.actions';
import {
  selectAlbumPhotos,
  selectIsLoading,
  selectMediaItems,
} from '../../store/selectors/photo.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit, OnDestroy {
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

  isLoading$ = this.store.select(selectIsLoading);

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private readonly store: Store<AppState>,
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
    const routeParams = this.route.snapshot.paramMap;
    const albumId = routeParams.get('albumId');

    if (albumId) {
      this.store.dispatch(setAlbumId({ albumId }));

      this.subscriptions.push(
        this.store.select(selectAlbumPhotos).subscribe((albumPhotos) => {
          if (albumPhotos) {
            this.mediaItems = albumPhotos.mediaItems;
            this.items = albumPhotos.mediaItems;
            this.photoBoxes = this.justifiedLayoutService.getBoxSizes(
              this.items
            );
          } else {
            this.store.dispatch(loadAlbumPhotos({ albumId }));
          }
        })
      );
    } else {
      this.subscriptions.push(
        this.store.select(selectMediaItems).subscribe((mediaItems) => {
          if (mediaItems) {
            this.mediaItems = mediaItems;
            this.items = mediaItems;
            this.photoBoxes = this.justifiedLayoutService.getBoxSizes(
              this.items
            );
          } else {
            this.store.dispatch(loadPhotos());
          }
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
