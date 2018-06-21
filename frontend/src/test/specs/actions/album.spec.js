import 'isomorphic-fetch';
import * as actionTypes from '../../../constants/actionTypes';
import { setAlbum, setAlbumDeleting } from '../../../actions/album';

const ALBUM = {
  id: '5',
};

describe('Album actions', () => {
  describe('SET_ALBUM', () => {
    it('Should create an action to set album', () => {
      expect(setAlbum(ALBUM)).to.deep.equal({
        type: actionTypes.SET_ALBUM,
        album: ALBUM,
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
