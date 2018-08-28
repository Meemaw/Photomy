import * as actionTypes from '../../constants/actionTypes';
import { GalleryType } from '../../meta/types/GalleryType';

export interface ISetGalleryType {
  type: actionTypes.SET_GALLERY_TYPE;
  galleryType: GalleryType;
}

export interface ISetAppError {
  type: actionTypes.SET_APP_ERROR;
}

export const setGalleryType = (galleryType: GalleryType): ISetGalleryType => ({
  galleryType,
  type: actionTypes.SET_GALLERY_TYPE,
});

export const setAppError = (): ISetAppError => ({
  type: actionTypes.SET_APP_ERROR,
});
