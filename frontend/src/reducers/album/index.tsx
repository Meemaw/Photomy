import { IRenameAlbum, ISetAlbum, ISetAlbumDeleting } from '../../actions/album';
import * as actionTypes from '../../constants/actionTypes';
import { Album } from '../../meta/types/Album';
import { AlbumState } from '../../meta/types/Store';

export const INITIAL_STATE: AlbumState = {
  album: {},
  albumDeleting: false,
};

const album = (
  state: AlbumState = INITIAL_STATE,
  action: ISetAlbum | IRenameAlbum | ISetAlbumDeleting,
): AlbumState => {
  switch (action.type) {
    case actionTypes.RENAME_ALBUM:
      const currentAlbum = state.album as Album;
      return { ...state, album: { ...currentAlbum, name: action.album.name } };
    case actionTypes.SET_ALBUM:
      return { ...state, album: action.album };
    case actionTypes.SET_ALBUM_DELETING:
      return { ...state, albumDeleting: action.albumDeleting };
    default:
      return state;
  }
};

export default album;
