import * as actionTypes from '../../../constants/actionTypes';
import {
  setFetchingImages,
  uploadImages,
  deleteImage,
  favoriteImage,
} from '../../../actions/gallery';
import { ALL_PHOTOS_GALLERY } from '../../../constants/galleryTypes';

const TEST_IMAGES = [{ image_id: '5' }];

describe('Gallery actions', () => {
  describe('SET_FETCHING_IMAGES', () => {
    it('Should create an action to set fetching images', () => {
      expect(setFetchingImages(ALL_PHOTOS_GALLERY, true)).to.deep.equal({
        type: actionTypes.SET_FETCHING_IMAGES,
        galleryType: ALL_PHOTOS_GALLERY,
        fetchingImages: true,
      });
    });
  });

  describe('UPLOAD_IMAGES', () => {
    it('Should create an action to upload images', () => {
      expect(uploadImages(TEST_IMAGES)).to.deep.equal({
        type: actionTypes.UPLOAD_IMAGES,
        images: TEST_IMAGES,
      });
    });
  });

  describe('DELETE_IMAGE', () => {
    it('Should create an action to delete image', () => {
      expect(deleteImage(TEST_IMAGES[0], ALL_PHOTOS_GALLERY)).to.deep.equal({
        type: actionTypes.DELETE_IMAGE,
        galleryType: ALL_PHOTOS_GALLERY,
        image: TEST_IMAGES[0],
      });
    });
  });

  describe('FAVORITE_IMAGE', () => {
    it('Should create an action to favorite an image', () => {
      expect(favoriteImage(TEST_IMAGES[0], ALL_PHOTOS_GALLERY)).to.deep.equal({
        type: actionTypes.FAVORITE_IMAGE,
        galleryType: ALL_PHOTOS_GALLERY,
        image: TEST_IMAGES[0],
      });
    });
  });
});
