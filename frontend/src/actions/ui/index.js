// @flow
import * as actionTypes from '../../constants/actionTypes';

export const setGalleryType = (galleryType: string) => ({
  type: actionTypes.SET_GALLERY_TYPE,
  galleryType,
});
