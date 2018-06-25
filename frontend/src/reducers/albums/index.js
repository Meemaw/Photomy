// @flow
import * as actionTypes from '../../constants/actionTypes';
import type { AlbumsState } from '../../meta/types/AlbumsState';

export const INITIAL_STATE: AlbumsState = {
  albumsFetched: false,
  albumsFetching: false,
  albums: [],
  updatedAt: null,
};

const albums = (state: AlbumsState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case actionTypes.SET_ALBUMS_FETCHING:
      return { ...state, albumsFetching: action.albumsFetching };
    case actionTypes.SET_ALBUMS:
      return { ...state, albums: action.albums, albumsFetched: true, updatedAt: new Date() };
    default:
      return state;
  }
};

export default albums;
