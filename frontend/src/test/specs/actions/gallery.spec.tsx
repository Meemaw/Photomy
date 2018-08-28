import { expect } from 'chai';

import {
  deleteImage,
  favoriteImage,
  setFetchingImages,
  uploadImages,
} from '../../../actions/gallery';
import * as actionTypes from '../../../constants/actionTypes';
import { GalleryType } from '../../../meta/types/GalleryType';
import { TEST_IMAGES } from '../../data/image';

describe('Gallery actions', () => {
  describe('SET_FETCHING_IMAGES', () => {
    it('Should create an action to set fetching images', () => {
      expect(setFetchingImages(GalleryType.ALL_PHOTOS_GALLERY, true)).to.deep.equal({
        type: actionTypes.SET_FETCHING_IMAGES,
        galleryType: GalleryType.ALL_PHOTOS_GALLERY,
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
      expect(deleteImage(TEST_IMAGES[0], GalleryType.ALL_PHOTOS_GALLERY)).to.deep.equal({
        type: actionTypes.DELETE_IMAGE,
        galleryType: GalleryType.ALL_PHOTOS_GALLERY,
        image: TEST_IMAGES[0],
      });
    });
  });

  describe('FAVORITE_IMAGE', () => {
    it('Should create an action to favorite an image', () => {
      expect(favoriteImage(TEST_IMAGES[0])).to.deep.equal({
        type: actionTypes.FAVORITE_IMAGE,
        image: TEST_IMAGES[0],
      });
    });
  });
});
