// @flow
import type { ProcessingStatus } from './ProcessingStatus';
import type { Album } from './Album';
import type { ImageIdentityMatch } from './ImageIdentityMatch';
import { deleteAlbum } from './Album';
import { setAlbumsCoverImageUrl } from './Album';

export type ImageId = string;

export type Image = {
  image_id: ImageId,
  image_url: string,
  preview_url: string,
  uploaded_at: Date,
  taken_on: ?Date,
  favorite: boolean,
  description: ?string,
  location: ?string,
  processing_status: ProcessingStatus,
  albums: Array<Album>,
};

export const mapImage = (image: Image) => {
  return {
    ...image,
    taken_on: image.taken_on ? new Date(image.taken_on) : null,
    uploaded_at: new Date(image.uploaded_at),
  };
};

export const mapImages = (images: Array<Image>) => {
  return images.map(mapImage);
};

export const deleteAlbumFromImages = (images: Array<Image>, albumId: string) => {
  return images.map(image => deleteAlbumFromImage(image, albumId));
};

export const deleteAlbumFromImage = (image: Image, albumId: string) => {
  return { ...image, albums: deleteAlbum(image.albums, albumId) };
};

export const addAlbumToImages = (images: Array<Image>, album: Album, toUpdate: Image) => {
  return images.map(
    image => (image.image_id === toUpdate.image_id ? addAlbumToImage(image, album) : image),
  );
};

export const addAlbumToImage = (image: Image, album: Album) => {
  return {
    ...image,
    albums: [...image.albums, album],
  };
};

export const setImagesAlbumCover = (
  images: Array<Image>,
  albumId: string,
  cover_image_url: string,
) => {
  return images.map(image => ({
    ...image,
    albums: setAlbumsCoverImageUrl(image.albums, albumId, cover_image_url),
  }));
};
