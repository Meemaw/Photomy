// @flow
import * as actionTypes from '../../constants/actionTypes';

export const setAlbum = (album: Object) => {
  return {
    type: actionTypes.SET_ALBUM,
    album,
  };
};
