import { Album } from './Album';
import { GalleryType } from './GalleryType';
import { Identity } from './Identity';
import { User } from './User';

export type IdentityState = { identity?: Identity };

export type GalleryState = {};

export type AuthState = {
  user?: User;
  isLoggedIn: boolean;
  tokenChecked: boolean;
  isAuthorized: boolean;
};

export type UiState = {
  galleryType: GalleryType;
  appError: boolean;
};

export type AlbumState = { album: Album | object; albumDeleting: boolean };

export type AlbumsState = {
  albumsFetched: boolean;
  albumsFetching: boolean;
  albums: Album[];
  updatedAt?: Date;
};

export type StoreState = {
  ui: UiState;
  albums: AlbumsState;
  album: AlbumState;
  auth: AuthState;
  identity: IdentityState;
  gallery: GalleryState;
};
