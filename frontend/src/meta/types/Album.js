import type { Image } from './Image';

export type Album = {
  id: string,
  images: Array<Image>,
  images_count: number,
  name: string,
  uploaded_at: Date,
};
