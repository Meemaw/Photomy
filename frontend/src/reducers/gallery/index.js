// @flow
import * as actionTypes from '../../constants/actionTypes';
import {
  GALLERY_REDUCERS,
  ALL_PHOTOS_GALLERY,
  FAVORITE_GALLERY,
  PEOPLE_GALLERY,
} from '../../constants/galleryTypes';
import {
  uploadImages,
  deleteImage,
  favoriteImage,
  buildDataMap,
  fetchingImages,
  updateIdentity,
} from './util';
import {
  deleteAlbumFromImages,
  addAlbumToImages,
  setImagesAlbumCover,
  renameAlbumImages,
} from '../../meta/types/Image';
import type { Gallery } from '../../meta/types/Gallery';
import type { Image } from '../../meta/types/Image';
import { removeImageFromAlbumsImages } from '../../meta/types/Album';

export const INITIAL_STATE: Object = GALLERY_REDUCERS.reduce((galleries, gallery) => {
  galleries[gallery.galleryType] = {
    count: 0,
    images: [],
    fetchingImages: false,
    dataMap: {},
    next: null,
    totalCount: 0,
    updatedAt: null,
    isEmpty: false,
  };
  return galleries;
}, {});

const applyToEach = (state: Object, f: Function, args: any) => {
  return Object.entries(state).reduce((newState, pair) => {
    const [galleryType, gallery] = pair;
    newState[galleryType] = f(gallery, args);
    return newState;
  }, {});
};

const removeAlbumFromGallery = (gallery: Gallery, { albumId }: Object) => {
  const updatedImages = deleteAlbumFromImages(gallery.images, albumId);
  return { ...gallery, images: updatedImages, dataMap: buildDataMap(updatedImages) };
};

const addAlbumToGalleryImage = (gallery: Gallery, { album, image }: Object) => {
  const updatedImages = addAlbumToImages(gallery.images, album, image);
  return { ...gallery, images: updatedImages, dataMap: buildDataMap(updatedImages) };
};

const setAlbumsCoverImageUrlToGallery = (
  gallery: Gallery,
  { albumId, cover_image_url }: Object,
) => {
  const updatedImages = setImagesAlbumCover(gallery.images, albumId, cover_image_url);
  return { ...gallery, images: updatedImages, dataMap: buildDataMap(updatedImages) };
};

const renameAlbumsToGallery = (gallery: Gallery, { album }: Object) => {
  const updatedImages = renameAlbumImages(gallery.images, album);
  return { ...gallery, images: updatedImages, dataMap: buildDataMap(updatedImages) };
};

const removeImageFromGalleryImageAlbums = (gallery: Gallery, { imageId, albumId }: Object) => {
  const images = gallery.images.map(image => {
    let updatedImage = {
      ...image,
      albums: removeImageFromAlbumsImages(image.albums, imageId, albumId),
    };

    if (image.image_id === imageId) {
      updatedImage = {
        ...updatedImage,
        albums: updatedImage.albums.filter(album => album.id !== albumId),
      };
    }

    return updatedImage;
  });
  return { ...gallery, images, dataMap: buildDataMap(images) };
};

const updateGalleryImage = (gallery: Gallery, { image }: Object) => {
  const imagePatch = image;
  const updatedImages = gallery.images.map(
    image => (image.image_id === imagePatch.image_id ? { ...image, ...imagePatch } : image),
  );
  const dataMap = gallery.dataMap;
  dataMap[imagePatch.image_id] = { ...dataMap[imagePatch.image_id], ...imagePatch };
  return { ...gallery, images: updatedImages, dataMap };
};

const gallery = (state: Object = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case actionTypes.REMOVE_IMAGE_FROM_ALBUM:
      return applyToEach(state, removeImageFromGalleryImageAlbums, action);
    case actionTypes.RENAME_ALBUM:
      return applyToEach(state, renameAlbumsToGallery, action);
    case actionTypes.SET_ALBUM_COVER_IMAGE:
      return applyToEach(state, setAlbumsCoverImageUrlToGallery, action);
    case actionTypes.DELETE_ALBUM_GALLERIES:
      return applyToEach(state, removeAlbumFromGallery, action);
    case actionTypes.ADD_ALBUM_TO_IMAGE:
      return applyToEach(state, addAlbumToGalleryImage, action);
    case actionTypes.UPDATE_IMAGE:
      return applyToEach(state, updateGalleryImage, action);

    case actionTypes.FAVORITE_IMAGE:
      const updatedFavoriteGallery = action.image.favorite
        ? uploadImages(state[FAVORITE_GALLERY], [action.image])
        : deleteImage(state[FAVORITE_GALLERY], action.image);

      return {
        ...state,
        [ALL_PHOTOS_GALLERY]: favoriteImage(state[ALL_PHOTOS_GALLERY], action.image),
        [FAVORITE_GALLERY]: updatedFavoriteGallery,
      };
    case actionTypes.DELETE_IMAGE:
      return {
        ...state,
        [action.galleryType]: deleteImage(state[action.galleryType], action.image),
        [FAVORITE_GALLERY]: action.image.favorite
          ? deleteImage(state[FAVORITE_GALLERY], action.image)
          : state[FAVORITE_GALLERY],
      };

    case actionTypes.UPLOAD_IMAGES:
      return {
        ...state,
        [ALL_PHOTOS_GALLERY]: uploadImages(state[ALL_PHOTOS_GALLERY], action.images),
      };
    case actionTypes.FETCH_IMAGES:
      const gallery = state[action.galleryType];

      let allImages;

      if (action.galleryType === FAVORITE_GALLERY && !gallery.firstFetchDone) {
        allImages = action.images;
      } else {
        allImages = [...gallery.images, ...action.images];
      }

      const mergedDataMap = buildDataMap(allImages);
      const isEmpty = allImages.length === 0;

      const hasMore = action.next !== null && action.next !== undefined;
      const updatedGallery = {
        ...gallery,
        images: allImages,
        dataMap: mergedDataMap,
        count: allImages.length,
        next: action.next,
        totalCount: action.totalCount,
        updatedAt: action.updatedAt,
        hasMore,
        isEmpty,
      };

      return { ...state, [action.galleryType]: updatedGallery };
    case actionTypes.SET_FETCHING_IMAGES:
      return {
        ...state,
        [action.galleryType]: fetchingImages(state[action.galleryType], action.fetchingImages),
      };
    case actionTypes.LOGOUT:
      return INITIAL_STATE;
    case actionTypes.SET_IDENTITY:
      return {
        ...state,
        [PEOPLE_GALLERY]: updateIdentity(state[PEOPLE_GALLERY], action.identity),
      };
    default:
      return state;
  }
};

export default gallery;
