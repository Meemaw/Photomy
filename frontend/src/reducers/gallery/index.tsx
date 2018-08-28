import { IRenameAlbum } from '../../actions/album';
import {
  IAddAlbumToImage,
  IDeleteAlbumGalleries,
  IRemoveImageFromAlbum,
  ISetAlbumCoverImage,
} from '../../actions/albums';
import { GalleryAction, IUpdateImage } from '../../actions/gallery';
import * as actionTypes from '../../constants/actionTypes';
import { GALLERY_REDUCERS } from '../../constants/galleryTypes';
import { Album, removeImageFromAlbumsCollection } from '../../meta/types/Album';
import { Gallery } from '../../meta/types/Gallery';
import { GalleryType } from '../../meta/types/GalleryType';
import {
  addAlbumToImageCollection,
  removeAlbumFromImageCollection,
  renameAlbumInImageCollection,
  setAlbumCoverToImageCollection,
} from '../../meta/types/Image';
import { GalleryState } from '../../meta/types/Store';
import {
  buildDataMap,
  deleteImage,
  favoriteImage,
  fetchingImages,
  updateIdentity,
  uploadImages,
} from './util';

export const INITIAL_STATE: GalleryState = GALLERY_REDUCERS.reduce((galleries, currentGallery) => {
  galleries[currentGallery.galleryType] = {
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

const applyToEach = (state: GalleryState, f: any, args: any) => {
  return Object.entries(state).reduce((newState, pair) => {
    const [galleryType, currentGallery] = pair;
    newState[galleryType] = f(currentGallery, args);
    return newState;
  }, {});
};

const removeAlbumFromGallery = (currentGallery: Gallery, { albumId }: IDeleteAlbumGalleries) => {
  const updatedImages = removeAlbumFromImageCollection(currentGallery.images, albumId);
  return {
    ...gallery,
    images: updatedImages,
    dataMap: buildDataMap(updatedImages),
  };
};

const addAlbumToGalleryImage = (currentGallery: Gallery, { album, image }: IAddAlbumToImage) => {
  const updatedImages = addAlbumToImageCollection(currentGallery.images, album, image);
  return {
    ...currentGallery,
    images: updatedImages,
    dataMap: buildDataMap(updatedImages),
  };
};

const setAlbumsCoverImageUrlToGallery = (
  currentGallery: Gallery,
  { albumId, cover_image_url }: ISetAlbumCoverImage,
) => {
  const updatedImages = setAlbumCoverToImageCollection(
    currentGallery.images,
    albumId,
    cover_image_url,
  );
  return {
    ...currentGallery,
    images: updatedImages,
    dataMap: buildDataMap(updatedImages),
  };
};

const renameAlbumsToGallery = (currentGallery: Gallery, { album }: IRenameAlbum) => {
  const updatedImages = renameAlbumInImageCollection(currentGallery.images, album);
  return {
    ...currentGallery,
    images: updatedImages,
    dataMap: buildDataMap(updatedImages),
  };
};

const removeImageFromGalleryImageAlbums = (
  currentGallery: Gallery,
  { imageId, albumId }: IRemoveImageFromAlbum,
) => {
  const images = currentGallery.images.map(image => {
    let updatedImage = {
      ...image,
      albums: removeImageFromAlbumsCollection(image.albums, imageId, albumId),
    };

    if (image.image_id === imageId) {
      updatedImage = {
        ...updatedImage,
        albums: updatedImage.albums.filter((album: Album) => album.id !== albumId),
      };
    }

    return updatedImage;
  });
  return { ...currentGallery, images, dataMap: buildDataMap(images) };
};

const updateGalleryImage = (currentGallery: Gallery, { image }: IUpdateImage) => {
  const imagePatch = image;
  const updatedImages = currentGallery.images.map(
    image => (image.image_id === imagePatch.image_id ? { ...image, ...imagePatch } : image),
  );
  const dataMap = currentGallery.dataMap;
  dataMap[imagePatch.image_id] = {
    ...dataMap[imagePatch.image_id],
    ...imagePatch,
  };
  return { ...currentGallery, images: updatedImages, dataMap };
};

const gallery = (state: GalleryState = INITIAL_STATE, action: GalleryAction) => {
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
        ? uploadImages(state[GalleryType.FAVORITE_GALLERY], [action.image])
        : deleteImage(state[GalleryType.FAVORITE_GALLERY], action.image);

      return {
        ...state,
        [GalleryType.ALL_PHOTOS_GALLERY]: favoriteImage(
          state[GalleryType.ALL_PHOTOS_GALLERY],
          action.image,
        ),
        [GalleryType.FAVORITE_GALLERY]: updatedFavoriteGallery,
      };
    case actionTypes.DELETE_IMAGE:
      return {
        ...state,
        [action.galleryType]: deleteImage(state[action.galleryType], action.image),
        [GalleryType.FAVORITE_GALLERY]: action.image.favorite
          ? deleteImage(state[GalleryType.FAVORITE_GALLERY], action.image)
          : state[GalleryType.FAVORITE_GALLERY],
      };

    case actionTypes.UPLOAD_IMAGES:
      return {
        ...state,
        [GalleryType.ALL_PHOTOS_GALLERY]: uploadImages(
          state[GalleryType.ALL_PHOTOS_GALLERY],
          action.images,
        ),
      };
    case actionTypes.FETCH_IMAGES:
      const gallery = state[action.galleryType];

      let allImages;

      if (action.galleryType === GalleryType.FAVORITE_GALLERY && !gallery.firstFetchDone) {
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
      if (action.identity === undefined) {
        return state;
      }
      return {
        ...state,
        [GalleryType.PEOPLE_GALLERY]: updateIdentity(
          state[GalleryType.PEOPLE_GALLERY],
          action.identity,
        ),
      };
    default:
      return state;
  }
};

export default gallery;
