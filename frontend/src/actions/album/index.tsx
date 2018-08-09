import * as actionTypes from '../../constants/actionTypes';
import { Album } from '../../meta/types/Album';
import { AlbumsApi } from '../../services';
import { deleteAlbumGalleries } from '../albums';

export interface ISetAlbum {
  type: actionTypes.SET_ALBUM;
  album: Album;
}

export interface IRenameAlbum {
  type: actionTypes.RENAME_ALBUM;
  album: Album;
}

export interface ISetAlbumDeleting {
  type: actionTypes.SET_ALBUM_DELETING;
  albumDeleting: boolean;
}

export const setAlbum = (album: Album): ISetAlbum => {
  return {
    album,
    type: actionTypes.SET_ALBUM,
  };
};

export const renameAlbum = (album: Album): IRenameAlbum => {
  return {
    album,
    type: actionTypes.RENAME_ALBUM,
  };
};

export const setAlbumDeleting = (albumDeleting: boolean): ISetAlbumDeleting => {
  return {
    albumDeleting,
    type: actionTypes.SET_ALBUM_DELETING,
  };
};

export const deleteAlbum = (albumId: string): ((dispatch: any) => Promise<void>) => {
  return (dispatch: any) => {
    dispatch(setAlbumDeleting(true));

    return AlbumsApi.delete({ album_id: albumId })
      .then(_ => {
        dispatch(setAlbumDeleting(false));
        dispatch(deleteAlbumGalleries(albumId));
      })
      .catch(err => {
        // console.log(err);
      });
  };
};
