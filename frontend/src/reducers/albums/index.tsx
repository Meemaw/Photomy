import { IRenameAlbum } from '../../actions/album';
import {
  IAddAlbum,
  IAddAlbumToImage,
  IDeleteAlbumGalleries,
  IRemoveImageFromAlbum,
  ISetAlbumCoverImage,
  ISetAlbums,
  ISetAlbumsFetching,
} from '../../actions/albums';
import * as actionTypes from '../../constants/actionTypes';
import {
  addImageToAlbumFromCollection,
  filterAlbum,
  removeImageFromAlbumsCollection,
  renameAlbumInCollection,
  updateAlbumCoverImageUrlInCollection,
} from '../../meta/types/Album';
import { AlbumsState } from '../../meta/types/Store';

export const INITIAL_STATE: AlbumsState = {
  albumsFetched: false,
  albumsFetching: false,
  albums: [],
  updatedAt: undefined,
};

const albums = (
  state: AlbumsState = INITIAL_STATE,
  action:
    | IRemoveImageFromAlbum
    | IAddAlbum
    | ISetAlbumCoverImage
    | IAddAlbumToImage
    | ISetAlbumsFetching
    | ISetAlbums
    | IDeleteAlbumGalleries
    | IRenameAlbum,
) => {
  switch (action.type) {
    case actionTypes.REMOVE_IMAGE_FROM_ALBUM:
      return {
        ...state,
        albums: removeImageFromAlbumsCollection(state.albums, action.imageId, action.albumId),
      };
    case actionTypes.ADD_ALBUM_TO_IMAGE:
      return {
        ...state,
        albums: addImageToAlbumFromCollection(state.albums, action.album, action.image),
      };
    case actionTypes.RENAME_ALBUM:
      return {
        ...state,
        albums: renameAlbumInCollection(state.albums, action.album),
      };
    case actionTypes.SET_ALBUM_COVER_IMAGE:
      return {
        ...state,
        albums: updateAlbumCoverImageUrlInCollection(
          state.albums,
          action.albumId,
          action.cover_image_url,
        ),
      };
    case actionTypes.ADD_ALBUM:
      return { ...state, albums: [...state.albums, action.album] };
    case actionTypes.DELETE_ALBUM_GALLERIES:
      return { ...state, albums: filterAlbum(state.albums, action.albumId) };
    case actionTypes.SET_ALBUMS_FETCHING:
      return { ...state, albumsFetching: action.albumsFetching };
    case actionTypes.SET_ALBUMS:
      return {
        ...state,
        albums: action.albums,
        albumsFetched: true,
        updatedAt: new Date(),
      };
    default:
      return state;
  }
};

export default albums;
