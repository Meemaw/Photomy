import * as actionTypes from '../../../constants/actionTypes';
import galleryReducer, { INITIAL_STATE } from '../../../reducers/gallery';
import {
  GALLERY_TYPES,
  PEOPLE_GALLERY,
  ALL_PHOTOS_GALLERY,
  FAVORITE_GALLERY,
} from '../../../constants/galleryTypes';

const TEST_IDENTITY = {
  identity: 'Marko',
  id: '1',
};

const TEST_IMAGES = [
  {
    image_id: '1',
    image_url: 'image_url',
    uploaded_at: new Date(),
    favorite: false,
    identity_group_id: '1',
    image_identity: 'Matej',
  },
  {
    image_id: '2',
    image_url: 'image_url',
    uploaded_at: new Date(),
    favorite: true,
    identity_group_id: '1',
    image_identity: 'Matej',
  },
];

const TEST_STATE = GALLERY_TYPES.reduce((galleries, gallery) => {
  galleries[gallery.galleryType] = {
    count: TEST_IMAGES.length,
    images:
      gallery.galleryType === FAVORITE_GALLERY
        ? TEST_IMAGES.filter(image => image.favorite)
        : TEST_IMAGES,
    fetchingImages: false,
    dataMap: {},
    next: null,
    totalCount: TEST_IMAGES.length,
    updatedAt: new Date(),
    isEmpty: false,
  };
  return galleries;
}, {});

describe('Gallery reducer', () => {
  it('should return the initial state', () => {
    const state = galleryReducer(undefined, {});
    expect(state).to.deep.equal(INITIAL_STATE);
  });

  describe('LOGOUT', () => {
    it('should return initial state', () => {
      const state = galleryReducer({ random: 'random' }, { type: actionTypes.LOGOUT });
      expect(state).to.equal(INITIAL_STATE);
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

    it('should change image_identity of images in ALL_PHOTOS_GALLERY', () => {
      const state = galleryReducer(TEST_STATE, {
        type: actionTypes.SET_IDENTITY,
        identity: TEST_IDENTITY,
      });

      expect(state[PEOPLE_GALLERY].images[0].image_identity).to.equal(TEST_IDENTITY.identity);
    });
  });

  describe('SET_FETCHING_IMAGES', () => {
    it('sets fetching images to correct gallery', () => {
      expect(
        galleryReducer(INITIAL_STATE, {
          type: actionTypes.SET_FETCHING_IMAGES,
          galleryType: PEOPLE_GALLERY,
          fetchingImages: true,
        }).PEOPLE_GALLERY.fetchingImages,
      ).to.equal(true);

      const allPhotosFetchingState = galleryReducer(INITIAL_STATE, {
        type: actionTypes.SET_FETCHING_IMAGES,
        galleryType: ALL_PHOTOS_GALLERY,
        fetchingImages: true,
      });

      expect(allPhotosFetchingState[ALL_PHOTOS_GALLERY].fetchingImages).to.equal(true);

      const allPhotosNotFetchingState = galleryReducer(allPhotosFetchingState, {
        type: actionTypes.SET_FETCHING_IMAGES,
        galleryType: ALL_PHOTOS_GALLERY,
        fetchingImages: false,
      });

      expect(allPhotosNotFetchingState[ALL_PHOTOS_GALLERY].fetchingImages).to.equal(false);
    });
  });

  describe('UPLOAD_IMAGES', () => {
    it('upload images', () => {
      const state = galleryReducer(INITIAL_STATE, {
        type: actionTypes.UPLOAD_IMAGES,
        images: TEST_IMAGES,
      });
      expect(state[ALL_PHOTOS_GALLERY].count).to.equal(TEST_IMAGES.length);
      expect(state[ALL_PHOTOS_GALLERY].images).to.deep.equal(TEST_IMAGES);
    });
  });

  describe('DELETE_IMAGE', () => {
    it('sets isEmpty if no images', () => {
      const state = galleryReducer(INITIAL_STATE, {
        type: actionTypes.DELETE_IMAGE,
        image: TEST_IMAGES[0],
        galleryType: ALL_PHOTOS_GALLERY,
      });

      expect(state[ALL_PHOTOS_GALLERY]).to.deep.equal({
        ...INITIAL_STATE[ALL_PHOTOS_GALLERY],
        isEmpty: true,
      });
    });

    it('deletes image from all photos', () => {
      const state = galleryReducer(TEST_STATE, {
        type: actionTypes.DELETE_IMAGE,
        image: TEST_IMAGES[0],
        galleryType: ALL_PHOTOS_GALLERY,
      });

      expect(state[ALL_PHOTOS_GALLERY].count).to.equal(1);
      expect(state[ALL_PHOTOS_GALLERY].isEmpty).to.equal(false);
      expect(state[FAVORITE_GALLERY].count).to.equal(2);
    });

    it('deletes image from favorites also if image is favorite', () => {
      const state = galleryReducer(TEST_STATE, {
        type: actionTypes.DELETE_IMAGE,
        image: TEST_IMAGES[1],
        galleryType: ALL_PHOTOS_GALLERY,
      });

      expect(state[ALL_PHOTOS_GALLERY].count).to.equal(1);
      expect(state[FAVORITE_GALLERY].count).to.equal(0);
      expect(state[FAVORITE_GALLERY].isEmpty).to.equal(true);
    });
  });

  describe('FAVORITE_IMAGE', () => {
    it('favorites the image', () => {
      const favoriteImage1 = { ...TEST_IMAGES[0], favorite: true };

      const state = galleryReducer(TEST_STATE, {
        type: actionTypes.FAVORITE_IMAGE,
        image: favoriteImage1,
      });

      expect(state[ALL_PHOTOS_GALLERY].images[0].favorite).to.equal(true);
      expect(state[ALL_PHOTOS_GALLERY].images.length).to.equal(2);
      expect(state[FAVORITE_GALLERY].count).to.equal(2);
    });

    it('unfavorites the image', () => {
      const unfavoriteImage2 = { ...TEST_IMAGES[1], favorite: false };

      const state = galleryReducer(TEST_STATE, {
        type: actionTypes.FAVORITE_IMAGE,
        image: unfavoriteImage2,
      });

      expect(state[ALL_PHOTOS_GALLERY].images[1].favorite).to.equal(false);
      expect(state[ALL_PHOTOS_GALLERY].images.length).to.equal(2);
      expect(state[FAVORITE_GALLERY].count).to.equal(0);
      expect(state[FAVORITE_GALLERY].isEmpty).to.equal(true);
    });
  });

  describe('FETCH_IMAGES', () => {
    it('Fetches images initially', () => {
      const state = galleryReducer(INITIAL_STATE, {
        type: actionTypes.FETCH_IMAGES,
        galleryType: ALL_PHOTOS_GALLERY,
        images: TEST_IMAGES,
      });
      expect(state[ALL_PHOTOS_GALLERY].count).to.equal(TEST_IMAGES.length);
      expect(state[ALL_PHOTOS_GALLERY].isEmpty).to.equal(false);
      expect(state[ALL_PHOTOS_GALLERY].hasMore).to.equal(false);
    });

    it('Merges images', () => {
      const state = galleryReducer(TEST_STATE, {
        type: actionTypes.FETCH_IMAGES,
        galleryType: ALL_PHOTOS_GALLERY,
        images: TEST_IMAGES,
        next: 'aba',
      });

      expect(state[ALL_PHOTOS_GALLERY].count).to.equal(2 * TEST_IMAGES.length);
      expect(state[ALL_PHOTOS_GALLERY].isEmpty).to.equal(false);
      expect(state[ALL_PHOTOS_GALLERY].hasMore).to.equal(true);
    });
  });
});
