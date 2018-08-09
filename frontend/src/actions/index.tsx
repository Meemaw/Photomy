import { deleteAlbum, renameAlbum, setAlbum } from './album';
import {
  addAlbum,
  addAlbumToImage,
  fetchAlbums,
  removeImageFromAlbum,
  setAlbumCoverImage,
} from './albums';
import { authorize, logout, setAuthTokenChecked, setAuthUser } from './auth';
import { deleteImage, favoriteImage, fetchImages, updateImage, uploadImages } from './gallery';
import { setIdentity } from './identity';
import { setAppError, setGalleryType } from './ui';

export {
  setAuthTokenChecked,
  setAuthUser,
  logout,
  authorize,
  setAlbum,
  deleteAlbum,
  renameAlbum,
  fetchAlbums,
  addAlbum,
  addAlbumToImage,
  setAlbumCoverImage,
  removeImageFromAlbum,
  setGalleryType,
  setAppError,
  setIdentity,
  fetchImages,
  uploadImages,
  deleteImage,
  favoriteImage,
  updateImage,
};
