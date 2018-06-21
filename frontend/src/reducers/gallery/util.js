// @flow
import type { Image } from '../../meta/types/Image';
import type { Identity } from '../../meta/types/Identity';
import type { Gallery } from '../../meta/types/Gallery';

export const buildDataMap = (images: Array<Image>) => {
  return images.reduce((acc, image, ix) => {
    acc[image.image_id] = { ...image, ix };
    return acc;
  }, {});
};

export const deleteImage = (gallery: Gallery, deletedImage: Image) => {
  const images = gallery.images.filter(image => image.image_id !== deletedImage.image_id);
  const dataMap = buildDataMap(images);
  const isEmpty = images.length === 0;
  return { ...gallery, dataMap, images, count: images.length, isEmpty };
};

export const uploadImages = (gallery: Gallery, uploadedImages: Image) => {
  const images = [...uploadedImages, ...gallery.images];
  const dataMap = buildDataMap(images);
  return { ...gallery, dataMap, images, count: images.length, isEmpty: false };
};

export const favoriteImage = (gallery: Gallery, favoriteImage: Image) => {
  const images = gallery.images.map(
    image => (image.image_id === favoriteImage.image_id ? favoriteImage : image),
  );
  const dataMap = buildDataMap(images);

  return { ...gallery, dataMap, images };
};

export const fetchingImages = (gallery: Gallery, fetchingImages: boolean) => {
  return { ...gallery, fetchingImages };
};

export const updateIdentity = (gallery: Gallery, identity: Identity) => {
  const updatedImages = updateImagesIdentity(gallery.images, identity);
  return { ...gallery, images: updatedImages };
};

export const updateImagesIdentity = (images: Array<Image>, identity: Identity) => {
  const image_identity = identity.identity;
  return images.map(
    image => (image.identity_group_id === identity.id ? { ...image, image_identity } : image),
  );
};
