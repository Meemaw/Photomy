// @flow
import * as actionTypes from '../../constants/actionTypes';
import { AlbumsApi } from '../../services';
import type { Album } from '../../meta/types/Album';
import type { Image } from '../../meta/types/Image';

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

export const mapAlbums = (albums: Array<Album>) => {
  return albums.map(album => ({
    ...album,
    uploaded_at: new Date(album.uploaded_at),
    images: mapImages(album.images),
  }));
};

const mapImages = (images: Array<Image>) => {
  return images.map(image => ({
    ...image,
    taken_on: new Date(image.taken_on),
    uploaded_at: new Date(image.uploaded_at),
  }));
};
