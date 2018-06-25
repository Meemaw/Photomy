import type { Image } from './Image';

export type Album = {
  id: string,
  images: Array<Image>,
  images_count: number,
  name: string,
  uploaded_at: Date,
  cover_image_url: string,
};

export const getCoverUrl = (album: Album) => {
  return album.cover_image_url
    ? album.cover_image_url
    : album.images && album.images.length > 0
      ? album.images[0].image_url
      : null;
};

export const displayAlbumName = (album: Album) => {
  return album.name || 'Untitled album';
};
