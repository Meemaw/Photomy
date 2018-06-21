// @flow
import * as actionTypes from '../../constants/actionTypes';
import { ALL_PHOTOS_GALLERY } from '../../constants/galleryTypes';
import type { UiState } from '../../meta/types/UiState';

export const INITIAL_STATE: UiState = { galleryType: ALL_PHOTOS_GALLERY, appError: false };

const ui = (state: UiState = INITIAL_STATE, action: any) => {
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
