import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Album } from '../../models/google-photo-albums';
import { AppState } from '../../store/app.state';
import { loadAlbums } from '../../store/actions/photo.actions';
import {
  selectIsLoading,
  selectPhotoAlbums,
} from '../../store/selectors/photo.selectors';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit, OnDestroy {
  albums: Album[] = [];
  items: Album[] = [];

  filterText: string = '';

  isLoading$ = this.store.select(selectIsLoading);

  private subscriptions: Subscription[] = [];

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select(selectPhotoAlbums).subscribe((albums) => {
        if (albums) {
          this.albums = albums;
          this.items = albums;
        } else {
          this.store.dispatch(loadAlbums());
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  filterData(): void {
    this.items = this.albums.filter((album: Album) => {
      return album.title.toLowerCase().includes(this.filterText.toLowerCase());
    });
  }
}
