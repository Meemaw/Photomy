import * as actions from '../../../actions';

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    expect(actions.setGalleryType('IMAGES')).to.deep.equal({
      type: 'SET_GALLERY_TYPE',
      galleryType: 'IMAGES',
    });
  });
});
