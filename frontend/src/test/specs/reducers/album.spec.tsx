import { expect } from 'chai';

import { ISetAlbum } from '../../../actions/album';
import * as actionTypes from '../../../constants/actionTypes';
import albumReducer, { INITIAL_STATE } from '../../../reducers/album';
import { TEST_ALBUM } from '../../data/album';

describe('Album reducer', () => {
  describe('SET_ALBUM', () => {
    it('Sets album', () => {
      const setAlbumPayload: ISetAlbum = { type: actionTypes.SET_ALBUM, album: TEST_ALBUM };
      const state = albumReducer(INITIAL_STATE, setAlbumPayload);
      expect(state).to.deep.equal({ ...INITIAL_STATE, album: TEST_ALBUM });
    });
  });

  describe('RENAME_ALBUM', () => {
    it('renames album', () => {
      const state = albumReducer(INITIAL_STATE, {
        type: actionTypes.RENAME_ALBUM,
        album: TEST_ALBUM,
      });

      expect(state).to.deep.equal({
        ...INITIAL_STATE,
        album: { ...INITIAL_STATE.album, name: TEST_ALBUM.name },
      });
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
