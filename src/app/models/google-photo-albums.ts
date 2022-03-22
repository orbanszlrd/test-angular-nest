export interface Album {
  id: string;
  title: string;
  productUrl: string;
  mediaItemsCount: string;
  coverPhotoBaseUrl: string;
  coverPhotoMediaItemId: string;
}

export interface GooglePhotoAlbums {
  albums: Album[];
  nextPageToken: string;
}
