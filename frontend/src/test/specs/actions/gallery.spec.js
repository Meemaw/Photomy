import * as actions from '../../../actions';
import * as actionTypes from '../../../constants/actionTypes';
import { ALL_PHOTOS_GALLERY } from '../../../constants/galleryTypes';

describe('gallery actions', () => {
  it('setGallery type should create proper object', () => {
    expect(actions.setGalleryType(ALL_PHOTOS_GALLERY)).to.deep.equal({
      type: actionTypes.SET_GALLERY_TYPE,
      galleryType: ALL_PHOTOS_GALLERY,
    });
  });
});
