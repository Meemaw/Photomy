// @flow
import type { Image } from './Image';

export type Gallery = {
  count: number,
  images: Array<Image>,
  fetchingImages: boolean,
  dataMap: Object,
  next: ?string,
  totalCount: number,
  updatedAt: ?Date,
  isEmpty: boolean,
};
