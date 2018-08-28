import { expect } from 'chai';

import * as actionTypes from '../../../constants/actionTypes';
import albumsReducer, { INITIAL_STATE } from '../../../reducers/albums';
import { TEST_ALBUM, TEST_ALBUM_2 } from '../../data/album';
import { TEST_IMAGE } from '../../data/image';
import { TEST_ALBUMS_STATE } from '../../data/state';

describe('Albums reducer', () => {
  describe('SET_ALBUMS', () => {
    it('Should set albums', () => {
      const state = albumsReducer(INITIAL_STATE, {
        type: actionTypes.SET_ALBUMS,
        albums: [TEST_ALBUM, TEST_ALBUM_2],
      });

      expect(state.albums).to.deep.equal([TEST_ALBUM, TEST_ALBUM_2]);
      expect(state.albumsFetched).to.equal(true);
    });
  });

  describe('SET_ALBUMS_FETCHING', () => {
    it('Shoult set albums fetching', () => {
      let state = albumsReducer(INITIAL_STATE, {
        type: actionTypes.SET_ALBUMS_FETCHING,
        albumsFetching: true,
      });
      expect(state.albumsFetching).to.equal(true);

      state = albumsReducer(state, {
        type: actionTypes.SET_ALBUMS_FETCHING,
        albumsFetching: false,
      });
      expect(state.albumsFetching).to.equal(false);
    });
  });

  describe('DELETE_ALBUM_GALLERIES', () => {
    it('Should delete album', () => {
      const state = albumsReducer(TEST_ALBUMS_STATE, {
        type: actionTypes.DELETE_ALBUM_GALLERIES,
        albumId: TEST_ALBUM.id,
      });

      expect(state.albums).to.deep.equal([TEST_ALBUM_2]);
    });
  });

  describe('SET_ALBUM_COVER_IMAGE', () => {
    it('Shouls set album cover image', () => {
      const state = albumsReducer(TEST_ALBUMS_STATE, {
        type: actionTypes.SET_ALBUM_COVER_IMAGE,
        albumId: TEST_ALBUM.id,
        cover_image_url: 'test',
      });
      expect(state.albums).to.deep.equal([
        { ...TEST_ALBUM, cover_image_url: 'test' },
        TEST_ALBUM_2,
      ]);
    });
  });

  describe('RENAME_ALBUM', () => {
    it('Should rename album', () => {
      const state = albumsReducer(TEST_ALBUMS_STATE, {
        type: actionTypes.RENAME_ALBUM,
        album: { ...TEST_ALBUM_2, name: 'Opa cupa' },
      });
      expect(state.albums).to.deep.equal([TEST_ALBUM, { ...TEST_ALBUM_2, name: 'Opa cupa' }]);
    });
  });

  describe('ADD_ALBUM_TO_IMAGE', () => {
    it('Should add album to image', () => {
      const state = albumsReducer(TEST_ALBUMS_STATE, {
        type: actionTypes.ADD_ALBUM_TO_IMAGE,
        album: TEST_ALBUM_2,
        image: TEST_IMAGE,
      });
      expect(state.albums[1]).to.deep.equal({
        ...TEST_ALBUM_2,
        images_count: TEST_ALBUM_2.images_count + 1,
        images: [TEST_IMAGE],
      });
    });
  });
});
