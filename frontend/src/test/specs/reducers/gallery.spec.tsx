import { expect } from 'chai';

import * as actionTypes from '../../../constants/actionTypes';
import { GALLERY_TYPES } from '../../../constants/galleryTypes';
import { GalleryType } from '../../../meta/types/GalleryType';
import { Image } from '../../../meta/types/Image';
import galleryReducer, { INITIAL_STATE } from '../../../reducers/gallery';
import {
  RANDOM_ALBUM,
  RENAMED_ALBUM,
  TEST_ALBUM,
  TEST_ALBUM_2,
  TEST_ALBUM_3,
} from '../../data/album';
import { TEST_IDENTITY } from '../../data/identity';
import { TEST_IMAGES } from '../../data/image';
import { TEST_GALLERY_STATE } from '../../data/state';

describe('Gallery reducer', () => {
  describe('LOGOUT', () => {
    it('should return initial state', () => {
      const state = galleryReducer({ random: 'random' }, { type: actionTypes.LOGOUT });
      expect(state).to.deep.equal(INITIAL_STATE);
    });
  });

  describe('REMOVE_IMAGE_FROM_ALBUM', () => {
    it('It should remove album from all images', () => {
      const state = galleryReducer(TEST_GALLERY_STATE, {
        type: actionTypes.REMOVE_IMAGE_FROM_ALBUM,
        albumId: TEST_ALBUM.id,
        imageId: TEST_IMAGES[0].image_id,
      });
      expect(state[GalleryType.ALL_PHOTOS_GALLERY].images[0].albums).to.deep.equal([TEST_ALBUM_2]);
      expect(state[GalleryType.ALL_PHOTOS_GALLERY].images[1].albums).to.deep.equal([
        { ...TEST_ALBUM, images: [], images_count: 0 },
        TEST_ALBUM_2,
      ]);
    });
  });

  describe('SET_ALBUM_COVER_IMAGE', () => {
    it('Should set cover_image for gallery albums', () => {
      const state = galleryReducer(TEST_GALLERY_STATE, {
        type: actionTypes.SET_ALBUM_COVER_IMAGE,
        albumId: TEST_ALBUM.id,
        cover_image_url: 'random_url',
      });

      state[GalleryType.ALL_PHOTOS_GALLERY].images.forEach((image: Image) => {
        expect(image.albums[0].cover_image_url).to.deep.equal('random_url');
      });
    });
  });

  describe('DELETE_ALBUM_GALLERIES', () => {
    it('Should delete album from images', () => {
      const state = galleryReducer(TEST_GALLERY_STATE, {
        type: actionTypes.DELETE_ALBUM_GALLERIES,
        albumId: TEST_ALBUM.id,
      });

      state[GalleryType.ALL_PHOTOS_GALLERY].images.forEach((image: Image) => {
        expect(image.albums).to.deep.equal([TEST_ALBUM_2]);
      });
    });
  });

  describe('ADD_ALBUM_TO_IMAGE', () => {
    it('Should add album to appropriate images', () => {
      const state = galleryReducer(TEST_GALLERY_STATE, {
        type: actionTypes.ADD_ALBUM_TO_IMAGE,
        album: TEST_ALBUM_3,
        image: TEST_IMAGES[0],
      });

      expect(state[GalleryType.ALL_PHOTOS_GALLERY].images[0].albums).to.deep.equal([
        TEST_ALBUM,
        TEST_ALBUM_2,
        { ...TEST_ALBUM_3, images: [TEST_IMAGES[0]], images_count: 1 },
      ]);
      expect(state[GalleryType.ALL_PHOTOS_GALLERY].images[1].albums).to.deep.equal([
        TEST_ALBUM,
        TEST_ALBUM_2,
      ]);
    });
  });

  describe('RENAME_ALBUM', () => {
    it('should do nothing when images has no album', () => {
      const state = galleryReducer(INITIAL_STATE, {
        type: actionTypes.RENAME_ALBUM,
        album: RANDOM_ALBUM,
      });
      expect(state).to.deep.equal(INITIAL_STATE);

      const anotherState = galleryReducer(TEST_GALLERY_STATE, {
        type: actionTypes.RENAME_ALBUM,
        album: RANDOM_ALBUM,
      });
      expect(anotherState).to.deep.equal(TEST_GALLERY_STATE);
    });

    it('Should rename albums to images on RENAME_ALBUM', () => {
      const state = galleryReducer(TEST_GALLERY_STATE, {
        type: actionTypes.RENAME_ALBUM,
        album: RENAMED_ALBUM,
      });

      GALLERY_TYPES.forEach(gallery =>
        expect(state[gallery.galleryType].images[0].albums).to.deep.equal([
          RENAMED_ALBUM,
          TEST_ALBUM_2,
        ]),
      );
    });
  });

  describe('UPDATE_IMAGE', () => {
    it('Should update approriate image', () => {
      const state = galleryReducer(TEST_GALLERY_STATE, {
        type: actionTypes.UPDATE_IMAGE,
        image: { ...TEST_IMAGES[0], image_url: 'test' },
      });
      expect(state[GalleryType.ALL_PHOTOS_GALLERY].images[0].image_url).to.equal('test');
    });
  });

  describe('SET_IDENTITY', () => {
    it('should do nothing when no images', () => {
      const state = galleryReducer(INITIAL_STATE, {
        type: actionTypes.SET_IDENTITY,
        identity: TEST_IDENTITY,
      });
      expect(state).to.deep.equal(INITIAL_STATE);
    });

    it('should change image_identity of images in PEOPLE_GALLERY', () => {
      const state = galleryReducer(TEST_GALLERY_STATE, {
        type: actionTypes.SET_IDENTITY,
        identity: TEST_IDENTITY,
      });

      expect(state[GalleryType.PEOPLE_GALLERY].images[0].image_identity).to.deep.equal(
        TEST_IDENTITY.identity,
      );
    });
  });

  describe('SET_FETCHING_IMAGES', () => {
    it('sets fetching images to correct gallery', () => {
      expect(
        galleryReducer(INITIAL_STATE, {
          type: actionTypes.SET_FETCHING_IMAGES,
          galleryType: GalleryType.PEOPLE_GALLERY,
          fetchingImages: true,
        })[GalleryType.PEOPLE_GALLERY].fetchingImages,
      ).to.equal(true);

      const allPhotosFetchingState = galleryReducer(INITIAL_STATE, {
        type: actionTypes.SET_FETCHING_IMAGES,
        galleryType: GalleryType.ALL_PHOTOS_GALLERY,
        fetchingImages: true,
      });

      expect(allPhotosFetchingState[GalleryType.ALL_PHOTOS_GALLERY].fetchingImages).to.equal(true);

      const allPhotosNotFetchingState = galleryReducer(allPhotosFetchingState, {
        type: actionTypes.SET_FETCHING_IMAGES,
        galleryType: GalleryType.ALL_PHOTOS_GALLERY,
        fetchingImages: false,
      });

      expect(allPhotosNotFetchingState[GalleryType.ALL_PHOTOS_GALLERY].fetchingImages).to.equal(
        false,
      );
    });
  });

  describe('UPLOAD_IMAGES', () => {
    it('upload images', () => {
      const state = galleryReducer(INITIAL_STATE, {
        type: actionTypes.UPLOAD_IMAGES,
        images: TEST_IMAGES,
      });
      expect(state[GalleryType.ALL_PHOTOS_GALLERY].count).to.equal(TEST_IMAGES.length);
      expect(state[GalleryType.ALL_PHOTOS_GALLERY].images).to.deep.equal(TEST_IMAGES);
    });
  });

  describe('DELETE_IMAGE', () => {
    it('sets isEmpty if no images', () => {
      const state = galleryReducer(INITIAL_STATE, {
        type: actionTypes.DELETE_IMAGE,
        image: TEST_IMAGES[0],
        galleryType: GalleryType.ALL_PHOTOS_GALLERY,
      });

      expect(state[GalleryType.ALL_PHOTOS_GALLERY]).to.deep.equal({
        ...INITIAL_STATE[GalleryType.ALL_PHOTOS_GALLERY],
        isEmpty: true,
      });
    });

    it('deletes image from all photos', () => {
      const state = galleryReducer(TEST_GALLERY_STATE, {
        type: actionTypes.DELETE_IMAGE,
        image: TEST_IMAGES[0],
        galleryType: GalleryType.ALL_PHOTOS_GALLERY,
      });

      expect(state[GalleryType.ALL_PHOTOS_GALLERY].count).to.equal(1);
      expect(state[GalleryType.ALL_PHOTOS_GALLERY].isEmpty).to.equal(false);
      expect(state[GalleryType.FAVORITE_GALLERY].count).to.equal(2);
    });

    it('deletes image from favorites also if image is favorite', () => {
      const state = galleryReducer(TEST_GALLERY_STATE, {
        type: actionTypes.DELETE_IMAGE,
        image: TEST_IMAGES[1],
        galleryType: GalleryType.ALL_PHOTOS_GALLERY,
      });

      expect(state[GalleryType.ALL_PHOTOS_GALLERY].count).to.equal(1);
      expect(state[GalleryType.FAVORITE_GALLERY].count).to.equal(0);
      expect(state[GalleryType.FAVORITE_GALLERY].isEmpty).to.equal(true);
    });
  });

  describe('FAVORITE_IMAGE', () => {
    it('favorites the image', () => {
      const favoriteImage1 = { ...TEST_IMAGES[0], favorite: true };

      const state = galleryReducer(TEST_GALLERY_STATE, {
        type: actionTypes.FAVORITE_IMAGE,
        image: favoriteImage1,
      });

      expect(state[GalleryType.ALL_PHOTOS_GALLERY].images[0].favorite).to.equal(true);
      expect(state[GalleryType.ALL_PHOTOS_GALLERY].images.length).to.equal(2);
      expect(state[GalleryType.FAVORITE_GALLERY].count).to.equal(2);
    });

    it('unfavorites the image', () => {
      const unfavoriteImage2 = { ...TEST_IMAGES[1], favorite: false };

      const state = galleryReducer(TEST_GALLERY_STATE, {
        type: actionTypes.FAVORITE_IMAGE,
        image: unfavoriteImage2,
      });

      expect(state[GalleryType.ALL_PHOTOS_GALLERY].images[1].favorite).to.equal(false);
      expect(state[GalleryType.ALL_PHOTOS_GALLERY].images.length).to.equal(2);
      expect(state[GalleryType.FAVORITE_GALLERY].count).to.equal(0);
      expect(state[GalleryType.FAVORITE_GALLERY].isEmpty).to.equal(true);
    });
  });

  describe('FETCH_IMAGES', () => {
    it('Fetches images initially', () => {
      const state = galleryReducer(INITIAL_STATE, {
        galleryType: GalleryType.ALL_PHOTOS_GALLERY,
        type: actionTypes.FETCH_IMAGES,
        images: TEST_IMAGES,
        next: undefined,
        dataMap: {},
        totalCount: 0,
        updatedAt: new Date(),
      });

      expect(state[GalleryType.ALL_PHOTOS_GALLERY].count).to.equal(TEST_IMAGES.length);
      expect(state[GalleryType.ALL_PHOTOS_GALLERY].isEmpty).to.equal(false);
      expect(state[GalleryType.ALL_PHOTOS_GALLERY].hasMore).to.equal(false);
    });

    it('Merges images', () => {
      const state = galleryReducer(TEST_GALLERY_STATE, {
        type: actionTypes.FETCH_IMAGES,
        galleryType: GalleryType.ALL_PHOTOS_GALLERY,
        images: TEST_IMAGES,
        next: 'aba',
        dataMap: {},
        totalCount: TEST_IMAGES.length,
        updatedAt: new Date(),
      });

      expect(state[GalleryType.ALL_PHOTOS_GALLERY].count).to.equal(2 * TEST_IMAGES.length);
      expect(state[GalleryType.ALL_PHOTOS_GALLERY].isEmpty).to.equal(false);
      expect(state[GalleryType.ALL_PHOTOS_GALLERY].hasMore).to.equal(true);
    });
  });
});
