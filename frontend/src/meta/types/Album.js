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

export const renameAlbums = (albums: Array<Album>, newAlbum: Album) => {
  return albums.map(album => (newAlbum.id === album.id ? { ...album, ...newAlbum } : album));
};

export const addImageToAlbum = (album: Album, image: Image) => {
  const baseImages = album.images || [];
  const baseCount = album.images_count || 0;
  return { ...album, images: [...baseImages, image], images_count: baseCount + 1 };
};

export const addImageToAlbums = (albums: Array<Album>, selectedAlbum: Album, image: Image) => {
  return albums.map(
    album => (album.id === selectedAlbum.id ? addImageToAlbum(album, image) : album),
  );
};

export const removeImageFromAlbumImages = (album: Album, imageId: string) => {
  const albumImages = album.images || [];
  return albumImages.filter(image => image.image_id !== imageId);
};

export const removeImageFromAlbumsImages = (
  albums: Array<Album>,
  imageId: string,
  albumId: string,
) => {
  return albums.map(album => {
    if (album.id === albumId) {
      const currentCount = album.images_count || 1;
      return {
        ...album,
        images: removeImageFromAlbumImages(album, imageId),
        images_count: currentCount - 1,
      };
    }
    return album;
  });
};
