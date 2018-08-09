import { Image } from './Image';

export type Gallery = {
  count: number;
  images: Image[];
  fetchingImages: boolean;
  dataMap: object;
  next?: string;
  totalCount: number;
  updatedAt?: Date;
  isEmpty: boolean;
};
