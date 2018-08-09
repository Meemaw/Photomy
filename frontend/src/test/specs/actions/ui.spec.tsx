import { expect } from 'chai';

import { setAppError, setGalleryType } from '../../../actions/ui';
import * as actionTypes from '../../../constants/actionTypes';
import { GalleryType } from '../../../meta/types/GalleryType';

describe('Gallery actions', () => {
  describe('SET_GALLERY_TYPE', () => {
    it('Should create an action to set gallery type', () => {
      expect(setGalleryType(GalleryType.ALL_PHOTOS_GALLERY)).to.deep.equal({
        type: actionTypes.SET_GALLERY_TYPE,
        galleryType: GalleryType.ALL_PHOTOS_GALLERY,
      });
    });
  });

  describe('SET_APP_ERROR', () => {
    it('Should create an action to set app error', () => {
      expect(setAppError()).to.deep.equal({
        type: actionTypes.SET_APP_ERROR,
      });
    });
  });
});
