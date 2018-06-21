import * as actionTypes from '../../../constants/actionTypes';
import uiReducer, { INITIAL_STATE } from '../../../reducers/ui';
import { PEOPLE_GALLERY } from '../../../constants/galleryTypes';

describe('Ui reducer', () => {
  it('should return the initial state', () => {
    const state = uiReducer(undefined, {});
    expect(state).to.deep.equal(INITIAL_STATE);
  });

  describe('SET_GALLERY_TYPE', () => {
    it('Should set gallery type', () => {
      const state = uiReducer(INITIAL_STATE, {
        type: actionTypes.SET_GALLERY_TYPE,
        galleryType: PEOPLE_GALLERY,
      });

      expect(state).to.deep.equal({ galleryType: PEOPLE_GALLERY, appError: false });
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
