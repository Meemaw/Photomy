import { ISetAppError, ISetGalleryType } from '../../actions/ui';
import * as actionTypes from '../../constants/actionTypes';
import { GalleryType } from '../../meta/types/GalleryType';
import { UiState } from '../../meta/types/Store';

export const INITIAL_STATE: UiState = {
  galleryType: GalleryType.ALL_PHOTOS_GALLERY,
  appError: false,
};

const ui = (state: UiState = INITIAL_STATE, action: ISetAppError | ISetGalleryType) => {
  switch (action.type) {
    case actionTypes.SET_GALLERY_TYPE:
      return { ...state, galleryType: action.galleryType };
    case actionTypes.SET_APP_ERROR:
      return { ...state, appError: true };
    default:
      return state;
  }
};

export default ui;
