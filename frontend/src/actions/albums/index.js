// @flow
import * as actionTypes from '../../constants/actionTypes';
import { mapAlbums } from '../../meta/types/Album';
import { AlbumsApi } from '../../services';
import type { Album } from '../../meta/types/Album';

export const addAlbumAction = (album: Album) => {
  return {
    type: actionTypes.ADD_ALBUM,
    album,
  };
};

export const setAlbumCoverImageAction = (albumId: string, cover_image_url: string) => {
  return {
    type: actionTypes.SET_ALBUM_COVER_IMAGE,
    albumId,
    cover_image_url,
  };
};

export const addAlbumToImage = (album: Album, image: Image) => {
  return {
    type: actionTypes.ADD_ALBUM_TO_IMAGE,
    album,
    image,
  };
};

export const setAlbumsFetching = (albumsFetching: boolean) => {
  return {
    type: actionTypes.SET_ALBUMS_FETCHING,
    albumsFetching,
  };
};

export const setAlbums = (albums: Array<Album>) => {
  return {
    type: actionTypes.SET_ALBUMS,
    albums,
  };
};

export const fetchAlbums = () => {
  return async (dispatch: any) => {
    dispatch(setAlbumsFetching(true));
    const albums = mapAlbums(await AlbumsApi.list());
    dispatch(setAlbums(albums));
    dispatch(setAlbumsFetching(false));
  };
};
