import * as actionTypes from '../../constants/actionTypes';
import { GALLERY_TYPES, ALL_PHOTOS_GALLERY } from '../../constants/galleryTypes';

const INITIAL_STATE = GALLERY_TYPES.reduce((galleries, gallery) => {
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

const buildDataMap = images => {
  return images.reduce((acc, image, ix) => {
    acc[image.image_id] = { ...image, ix };
    return acc;
  }, {});
};

const deleteImage = (gallery, deletedImage) => {
  const images = gallery.images.filter(image => image.image_id !== deletedImage.image_id);
  const dataMap = buildDataMap(images);
  const isEmpty = images.length === 0;
  return { ...gallery, dataMap, images, count: images.length, isEmpty };
};

const uploadImages = (gallery, uploadedImages) => {
  const images = [...uploadedImages, ...gallery.images];
  const dataMap = buildDataMap(images);
  return { ...gallery, dataMap, images, count: images.length, isEmpty: false };
};

const favoriteImage = (gallery, favoriteImage) => {
  const images = gallery.images.map(
    image => (image.image_id === favoriteImage.image_id ? favoriteImage : image),
  );
  let dataMap = gallery.dataMap;
  dataMap[favoriteImage.image_id] = favoriteImage;

  return { ...gallery, dataMap, images };
};

const gallery = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FAVORITE_IMAGE:
      return {
        ...state,
        [action.galleryType]: favoriteImage(state[action.galleryType], action.image),
      };
    case actionTypes.DELETE_IMAGE:
      return {
        ...state,
        [action.galleryType]: deleteImage(state[action.galleryType], action.image),
      };

    case actionTypes.UPLOAD_IMAGES:
      return {
        ...state,
        [ALL_PHOTOS_GALLERY]: uploadImages(state[ALL_PHOTOS_GALLERY], action.images),
      };
    case actionTypes.FETCH_IMAGES:
      const gallery = state[action.galleryType];
      const allImages = [...gallery.images, ...action.images];
      const mergedDataMap = { ...gallery.dataMap, ...action.dataMap };
      const isEmpty = allImages.length === 0;

      const updatedGallery = {
        ...gallery,
        images: allImages,
        dataMap: mergedDataMap,
        count: allImages.length,
        next: action.next,
        totalCount: action.totalCount,
        updatedAt: action.updatedAt,
        isEmpty: isEmpty,
      };

      return { ...state, [action.galleryType]: updatedGallery };
    case action.FETCHING_IMAGES:
      return { ...state, fetchingImages: action.fetchingImages };
    case actionTypes.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default gallery;
