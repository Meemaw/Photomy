// @flow
import * as actionTypes from '../../constants/actionTypes';
import { deleteAlbum } from '../../meta/types/Album';
import { setAlbumsCoverImageUrl } from '../../meta/types/Album';
import type { AlbumsState } from '../../meta/types/AlbumsState';

export const INITIAL_STATE: AlbumsState = {
  albumsFetched: false,
  albumsFetching: false,
  albums: [],
  updatedAt: null,
};

const albums = (state: AlbumsState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case actionTypes.SET_ALBUM_COVER_IMAGE:
      return {
        ...state,
        albums: setAlbumsCoverImageUrl(state.albums, action.albumId, action.cover_image_url),
      };
    case actionTypes.ADD_ALBUM:
      return { ...state, albums: [...state.albums, action.album] };
    case actionTypes.DELETE_ALBUM_GALLERIES:
      return { ...state, albums: deleteAlbum(state.albums, action.albumId) };
    case actionTypes.SET_ALBUMS_FETCHING:
      return { ...state, albumsFetching: action.albumsFetching };
    case actionTypes.SET_ALBUMS:
      return { ...state, albums: action.albums, albumsFetched: true, updatedAt: new Date() };
    default:
      return state;
  }
};

export default albums;
