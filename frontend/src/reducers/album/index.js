import * as actionTypes from '../../constants/actionTypes';

const INITIAL_STATE = { album: {} };

const album = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_ALBUM:
      return { ...state, album: action.album };
    default:
      return state;
  }
};

export default album;
