import {
  addImageToAlbumCollection,
  Album,
  filterAlbum,
  renameAlbumInCollection,
  setCoverImageUrlToAlbumCollection,
} from './Album';
import { ImageIdentityMatch } from './ImageIdentityMatch';

export type Image = {
  taken_on?: Date;
  uploaded_at: Date;
  image_id: string;
  id: string;
  favorite: boolean;
  identity_group_id: string;
  albums: Album[];
  preview_url: string;
  image_url: string;
  ix: number;
  confirmed: boolean;
  image_identity: string;
  location?: string;
  description?: string;
  processing_status: string;
};

export type ServerImage = {
  taken_on: string;
  uploaded_at: string;
  image_id: string;
  id: string;
  favorite: boolean;
  identity_group_id: string;
  preview_url: string;
  image_url: string;
  ix: number;
  confirmed: boolean;
  image_identity: string;
  location?: string;
  description?: string;
  processing_status: string;
};

export type ImageMap = {
  [image_id: string]: ImageMatch;
};

export type ImageMatch = Image | ImageIdentityMatch;

export const mapImage = (image: ImageMatch): ImageMatch => {
  return {
    ...image,
    taken_on: image.taken_on ? new Date(image.taken_on) : undefined,
    uploaded_at: new Date(image.uploaded_at),
  };
};

export const mapImages = (images: ImageMatch[]) => {
  return images.map(mapImage);
};

export const removeAlbumFromImageCollection = (images: Image[], albumId: string) => {
  return images.map(image => removeAlbumFromImage(image, albumId));
};

export const removeAlbumFromImage = (image: Image, albumId: string) => {
  return { ...image, albums: filterAlbum(image.albums, albumId) };
};

export const addAlbumToImageCollection = (images: Image[], album: Album, toUpdate: Image) => {
  return images.map(image => {
    const withAlbum = image.image_id === toUpdate.image_id ? addAlbumToImage(image, album) : image;
    return {
      ...withAlbum,
      albums: addImageToAlbumCollection(withAlbum.albums, album, toUpdate),
    };
  });
};

export const addAlbumToImage = (image: Image, album: Album) => {
  return {
    ...image,
    albums: [...image.albums, album],
  };
};

export const setAlbumCoverToImageCollection = (
  images: Image[],
  albumId: string,
  cover_image_url: string,
) => {
  return images.map(image => ({
    ...image,
    albums: setCoverImageUrlToAlbumCollection(image.albums, albumId, cover_image_url),
  }));
};

export const renameAlbumInImageCollection = (images: Image[], album: Album) => {
  return images.map(image => ({
    ...image,
    albums: renameAlbumInCollection(image.albums, album),
  }));
};
