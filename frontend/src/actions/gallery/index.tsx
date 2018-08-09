import * as actionTypes from '../../constants/actionTypes';
import { GalleryType } from '../../meta/types/GalleryType';
import { Image, ImageMatch, mapImages } from '../../meta/types/Image';
import { IRenameAlbum } from '../album';
import {
  IAddAlbumToImage,
  IDeleteAlbumGalleries,
  IRemoveImageFromAlbum,
  ISetAlbumCoverImage,
} from '../albums';
import { ILogout } from '../auth';
import { ISetIdentity } from '../identity';

export interface IUpdateImage {
  type: actionTypes.UPDATE_IMAGE;
  image: Image;
}

export interface ISetFetchingImages {
  type: actionTypes.SET_FETCHING_IMAGES;
  fetchingImages: boolean;
  galleryType: GalleryType;
}

export interface IUploadImages {
  type: actionTypes.UPLOAD_IMAGES;
  images: Image[];
}

export interface IDeleteImage {
  type: actionTypes.DELETE_IMAGE;
  galleryType: GalleryType;
  image: Image;
}

export interface IFavoriteImage {
  type: actionTypes.FAVORITE_IMAGE;
  image: Image;
}

export interface ISetFetchedImages {
  type: actionTypes.FETCH_IMAGES;
  galleryType: GalleryType;
  images: ImageMatch[];
  dataMap: IDataMap;
  next?: string;
  totalCount: number;
  updatedAt: Date;
}

export type GalleryAction =
  | IFavoriteImage
  | IDeleteImage
  | IUploadImages
  | ISetFetchingImages
  | IUpdateImage
  | ISetFetchedImages
  | IRemoveImageFromAlbum
  | IRenameAlbum
  | ISetAlbumCoverImage
  | IDeleteAlbumGalleries
  | IAddAlbumToImage
  | ILogout
  | ISetIdentity;

export interface IDataMap {
  [imageId: string]: ImageMatch;
}

export const updateImage = (image: Image): IUpdateImage => {
  return {
    image,
    type: actionTypes.UPDATE_IMAGE,
  };
};

export const setFetchingImages = (
  galleryType: GalleryType,
  fetchingImages: boolean,
): ISetFetchingImages => {
  return {
    fetchingImages,
    galleryType,
    type: actionTypes.SET_FETCHING_IMAGES,
  };
};

export const uploadImages = (images: Image[]): IUploadImages => {
  return {
    images,
    type: actionTypes.UPLOAD_IMAGES,
  };
};

export const deleteImage = (image: Image, galleryType: GalleryType): IDeleteImage => {
  return {
    galleryType,
    image,
    type: actionTypes.DELETE_IMAGE,
  };
};

export const favoriteImage = (image: Image): IFavoriteImage => {
  return {
    image,
    type: actionTypes.FAVORITE_IMAGE,
  };
};

export const setFetchedImages = (
  galleryType: GalleryType,
  images: ImageMatch[],
  dataMap: IDataMap,
  next: string,
  totalCount: number,
  updatedAt: Date,
): ISetFetchedImages => {
  return {
    dataMap,
    galleryType,
    images,
    next,
    totalCount,
    type: actionTypes.FETCH_IMAGES,
    updatedAt,
  };
};

export const fetchImages = (
  fetchFunction: any,
  fetchArguments: any,
  galleryType: GalleryType,
): any => {
  return (dispatch: any) => {
    dispatch(setFetchingImages(galleryType, true));

    fetchFunction(fetchArguments)
      .then((resp: any) => {
        dispatch(setFetchingImages(galleryType, false));
        const images = mapImages(resp.results);
        const dataMap = images.reduce((acc, image, ix) => {
          acc[image.image_id] = { ...image, ix };
          return acc;
        }, {});

        dispatch(setFetchedImages(galleryType, images, dataMap, resp.next, resp.count, new Date()));
      })
      .catch((err: any) => {
        // console.log(err)
      });
  };
};
