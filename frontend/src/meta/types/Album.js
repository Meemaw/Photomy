// @flow
import type { Image } from './Image';
import { mapImages } from './Image';

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

export const mapAlbum = (album: Album) => {
  return {
    ...album,
    uploaded_at: new Date(album.uploaded_at),
    images: mapImages(album.images),
  };
};

export const mapAlbums = (albums: Array<Album>) => {
  return albums.map(mapAlbum);
};

export const withImage = (album: Album, image: Image) => {
  const updatedImages = [...album.images, image];
  let updatedAlbum = { ...album, images: updatedImages, images_count: updatedImages.length };
  if (!updatedAlbum.cover_image_url) {
    updatedAlbum.cover_image_url = image.image_url;
  }
  return updatedAlbum;
};

export const deleteAlbum = (albums: Array<Album>, albumId: string) => {
  return albums.filter(album => album.id !== albumId);
};

export const setAlbumsCoverImageUrl = (
  albums: Array<Album>,
  albumId: string,
  cover_image_url: string,
) => {
  return albums.map(album => (album.id === albumId ? { ...album, cover_image_url } : album));
};
