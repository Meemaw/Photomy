// @flow
import * as actionTypes from '../../constants/actionTypes';
import { AlbumsApi } from '../../services';

export const setAlbum = (album: Object) => {
  return {
    type: actionTypes.SET_ALBUM,
    album,
  };
};

export const deleteAlbumGalleries = (albumId: string) => {
  return {
    type: actionTypes.DELETE_ALBUM_GALLERIES,
    albumId,
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
        dispatch(setAlbumDeleting(false));
        dispatch(deleteAlbumGalleries(album_id));
      })
      .catch(err => console.log(err));
  };
};
