import 'isomorphic-fetch';

import { expect } from 'chai';

import { setAlbum, setAlbumDeleting } from '../../../actions/album';
import * as actionTypes from '../../../constants/actionTypes';
import { TEST_ALBUM } from '../../data/album';

describe('Album actions', () => {
  describe('SET_ALBUM', () => {
    it('Should create an action to set album', () => {
      expect(setAlbum(TEST_ALBUM)).to.deep.equal({
        type: actionTypes.SET_ALBUM,
        album: TEST_ALBUM,
      });
    });
  });

  describe('SET_ALBUM_DELETING', () => {
    it('Should createa an action to set album deleting', () => {
      expect(setAlbumDeleting(true)).to.deep.equal({
        type: actionTypes.SET_ALBUM_DELETING,
        albumDeleting: true,
      });
    });
  });
});
