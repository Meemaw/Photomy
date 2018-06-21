// @flow
import * as actionTypes from '../../constants/actionTypes';
import { AlbumsApi } from '../../services';

export const setAlbum = (album: Object) => {
  return {
    type: actionTypes.SET_ALBUM,
    album,
  };
};

export const setAlbumDeleting = (albumDeleting: boolean) => {
  return {
    type: actionTypes.SET_ALBUM_DELETING,
    albumDeleting,
  };
};

export const deleteAlbum = (album_id: string) => {
  return (dispatch: any) => {
    dispatch(setAlbumDeleting(true));

    return AlbumsApi.delete({ album_id })
      .then(resp => {
        console.log('HAA');
        dispatch(setAlbumDeleting(false));
        dispatch(setAlbum({}));
      })
      .catch(err => console.log(err));
  };
};
