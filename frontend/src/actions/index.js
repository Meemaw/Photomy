import { setGalleryType, setAppError } from './ui';
import { setAuthTokenChecked, setAuthUser, logout, authorize } from './auth';
import { setIdentity } from './identity';
import { fetchImages, uploadImages, deleteImage, favoriteImage, updateImage } from './gallery';
import { setAlbum, deleteAlbum } from './album';
import { fetchAlbums } from './albums';

export {
  setAlbum,
  setGalleryType,
  setAuthTokenChecked,
  setAuthUser,
  logout,
  authorize,
  setIdentity,
  fetchImages,
  uploadImages,
  deleteImage,
  favoriteImage,
  deleteAlbum,
  updateImage,
  setAppError,
  fetchAlbums,
};
