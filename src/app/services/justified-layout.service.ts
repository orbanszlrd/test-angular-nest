import { Injectable } from '@angular/core';

import justifyLayout from 'justified-layout';
import { MediaItem } from '../models/google-media-items';

@Injectable({
  providedIn: 'root',
})
export class JustifiedLayoutService {
  getBoxSizes(data: MediaItem[]) {
    const photoAspectRatio: number[] = [];

    data.forEach((item: MediaItem) => {
      photoAspectRatio.push(
        +item.mediaMetadata.width / +item.mediaMetadata.height
      );
    });

    const container: HTMLElement | null =
      document.querySelector('.o-container');

    if (container !== null) {
      return justifyLayout(photoAspectRatio, {
        containerWidth: container.offsetWidth,
        containerPadding: {
          top: 0,
          right: 16,
          left: 16,
          bottom: 16,
        },
        boxSpacing: {
          horizontal: 4,
          vertical: 4,
        },
        targetRowHeight: 250,
      });
    }

    return {
      containerHeight: 0,
      boxes: [],
    };
  }
}
