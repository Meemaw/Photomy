import * as actionTypes from '../../../constants/actionTypes';
import albumReducer, { INITIAL_STATE } from '../../../reducers/album';

const TEST_ALBUM = { id: '1', images: [], images_count: 100 };

describe('Album reducer', () => {
  it('should return the initial state', () => {
    const state = albumReducer(undefined, {});
    expect(state).to.deep.equal(INITIAL_STATE);
  });

  describe('SET_ALBUM', () => {
    it('Sets album', () => {
      const state = albumReducer(INITIAL_STATE, { type: actionTypes.SET_ALBUM, album: TEST_ALBUM });
      expect(state).to.deep.equal({ ...INITIAL_STATE, album: TEST_ALBUM });
    });
  });

  describe('SET_ALBUM_DELETING', () => {
    it('Sets album is deleting', () => {
      const state = albumReducer(INITIAL_STATE, {
        type: actionTypes.SET_ALBUM_DELETING,
        albumDeleting: true,
      });
      expect(state).to.deep.equal({ ...INITIAL_STATE, albumDeleting: true });
    });
  });
});
