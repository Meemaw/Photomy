import * as actionTypes from '../../../constants/actionTypes';

import { setGalleryType, setAppError } from '../../../actions/ui';
import { ALL_PHOTOS_GALLERY } from '../../../constants/galleryTypes';

describe('Gallery actions', () => {
  describe('SET_GALLERY_TYPE', () => {
    it('Should create an action to set gallery type', () => {
      expect(setGalleryType(ALL_PHOTOS_GALLERY)).to.deep.equal({
        type: actionTypes.SET_GALLERY_TYPE,
        galleryType: ALL_PHOTOS_GALLERY,
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
