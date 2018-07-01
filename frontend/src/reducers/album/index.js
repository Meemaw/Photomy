// @flow
import * as actionTypes from '../../constants/actionTypes';
import type { AlbumState } from '../../meta/types/AlbumState';

export const INITIAL_STATE: AlbumState = { album: {}, albumDeleting: false };

const album = (state: AlbumState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case actionTypes.RENAME_ALBUM:
      return { ...state, album: { ...state.album, name: action.album.name } };
    case actionTypes.SET_ALBUM:
      return { ...state, album: action.album };
    case actionTypes.SET_ALBUM_DELETING:
      return { ...state, albumDeleting: action.albumDeleting };
    default:
      return state;
  }
};

export default album;
