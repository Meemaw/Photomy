// @flow
import * as actionTypes from '../../constants/actionTypes';
import {
  GALLERY_TYPES,
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
import type { GalleryState } from '../../meta/types/GalleryState';

export const INITIAL_STATE: GalleryState = GALLERY_TYPES.reduce((galleries, gallery) => {
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

const gallery = (state: GalleryState = INITIAL_STATE, action: any) => {
  switch (action.type) {
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
