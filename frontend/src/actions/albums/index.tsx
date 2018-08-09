import * as actionTypes from '../../constants/actionTypes';
import { Album, mapAlbums } from '../../meta/types/Album';
import { Image } from '../../meta/types/Image';
import { AlbumsApi } from '../../services';

export interface IRemoveImageFromAlbum {
  albumId: string;
  imageId: string;
  type: actionTypes.REMOVE_IMAGE_FROM_ALBUM;
}

export interface IAddAlbum {
  album: Album;
  type: actionTypes.ADD_ALBUM;
}

export interface ISetAlbumCoverImage {
  albumId: string;
  cover_image_url: string;
  type: actionTypes.SET_ALBUM_COVER_IMAGE;
}

export interface IAddAlbumToImage {
  album: Album;
  image: Image;
  type: actionTypes.ADD_ALBUM_TO_IMAGE;
}

export interface ISetAlbumsFetching {
  type: actionTypes.SET_ALBUMS_FETCHING;
  albumsFetching: boolean;
}

export interface ISetAlbums {
  type: actionTypes.SET_ALBUMS;
  albums: Album[];
}

export interface IDeleteAlbumGalleries {
  type: actionTypes.DELETE_ALBUM_GALLERIES;
  albumId: string;
}

export type AlbumAction =
  | IDeleteAlbumGalleries
  | ISetAlbums
  | ISetAlbumsFetching
  | IAddAlbumToImage
  | ISetAlbumCoverImage
  | IAddAlbum
  | IRemoveImageFromAlbum;

export const deleteAlbumGalleries = (albumId: string): IDeleteAlbumGalleries => {
  return {
    albumId,
    type: actionTypes.DELETE_ALBUM_GALLERIES,
  };
};

export const removeImageFromAlbum = (imageId: string, albumId: string): IRemoveImageFromAlbum => {
  return {
    albumId,
    imageId,
    type: actionTypes.REMOVE_IMAGE_FROM_ALBUM,
  };
};

export const addAlbum = (album: Album): IAddAlbum => {
  return {
    album,
    type: actionTypes.ADD_ALBUM,
  };
};

export const setAlbumCoverImage = (albumId: string, coverImageUrl: string): ISetAlbumCoverImage => {
  return {
    albumId,
    cover_image_url: coverImageUrl,
    type: actionTypes.SET_ALBUM_COVER_IMAGE,
  };
};

export const addAlbumToImage = (album: Album, image: Image): IAddAlbumToImage => {
  return {
    album,
    image,
    type: actionTypes.ADD_ALBUM_TO_IMAGE,
  };
};

export const setAlbumsFetching = (albumsFetching: boolean): ISetAlbumsFetching => {
  return {
    albumsFetching,
    type: actionTypes.SET_ALBUMS_FETCHING,
  };
};

export const setAlbums = (albums: Album[]): ISetAlbums => {
  return {
    albums,
    type: actionTypes.SET_ALBUMS,
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
