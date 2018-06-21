export type Gallery = {
  count: number,
  image: Array<Image>,
  fetchingImages: boolean,
  dataMap: Object,
  next: ?string,
  totalCount: number,
  updatedAt: ?Date,
  isEmpty: boolean,
};
