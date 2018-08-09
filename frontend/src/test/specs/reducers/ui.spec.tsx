import { expect } from 'chai';

import * as actionTypes from '../../../constants/actionTypes';
import { GalleryType } from '../../../meta/types/GalleryType';
import uiReducer, { INITIAL_STATE } from '../../../reducers/ui';

describe('Ui reducer', () => {
  describe('SET_GALLERY_TYPE', () => {
    it('Should set gallery type', () => {
      const state = uiReducer(INITIAL_STATE, {
        type: actionTypes.SET_GALLERY_TYPE,
        galleryType: GalleryType.PEOPLE_GALLERY,
      });

      expect(state).to.deep.equal({ galleryType: GalleryType.PEOPLE_GALLERY, appError: false });
    });
  });

  describe('SET_APP_ERROR', () => {
    it('Sets app error', () => {
      const state = uiReducer(INITIAL_STATE, {
        type: actionTypes.SET_APP_ERROR,
      });

      expect(state).to.deep.equal({ galleryType: INITIAL_STATE.galleryType, appError: true });
    });
  });
});
