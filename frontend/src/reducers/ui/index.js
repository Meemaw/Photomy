import * as actionTypes from '../../constants/actionTypes';
import { ALL_PHOTOS_GALLERY } from '../../constants/galleryTypes';
import { GALLERY_MENU } from '../../constants/menus';

const INITIAL_STATE = { galleryType: ALL_PHOTOS_GALLERY, menu: GALLERY_MENU, appError: false };

const ui = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_GALLERY_TYPE:
      return { ...state, galleryType: action.galleryType };
    case actionTypes.SET_MENU:
      return { ...state, menu: action.menu };
    case actionTypes.SET_APP_ERROR:
      return { ...state, appError: true };
    default:
      return state;
  }
};

export default ui;
