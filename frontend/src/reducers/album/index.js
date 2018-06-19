import * as actionTypes from '../../constants/actionTypes';

const INITIAL_STATE = { album: {}, albumDeleting: false };

const album = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_ALBUM:
      return { ...state, album: action.album };
    case actionTypes.SET_ALBUM_DELETING:
      return { ...state, albumDeleting: action.albumDeleting };
    default:
      return state;
  }
};

export default album;
