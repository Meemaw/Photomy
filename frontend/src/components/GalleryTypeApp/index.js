// @flow
import React from 'react';
import Loadable from '../common/Loadable';
import { connect } from 'react-redux';
import {
  ALL_PHOTOS_GALLERY,
  PEOPLE_GALLERY,
  FAVORITE_GALLERY,
  ALBUM_GALLERY,
} from '../../constants/galleryTypes';

const AsyncAllPhotos = Loadable({
  loader: () => import('../modules/AllPhotos'),
});

const AsyncPeople = Loadable({
  loader: () => import('../modules/People'),
});

const AsyncFavorite = Loadable({
  loader: () => import('../modules/Favorite'),
});

const AsyncAlbums = Loadable({
  loader: () => import('../modules/Albums'),
});

const GALLERY_MAP = {
  [ALL_PHOTOS_GALLERY]: AsyncAllPhotos,
  [PEOPLE_GALLERY]: AsyncPeople,
  [FAVORITE_GALLERY]: AsyncFavorite,
  [ALBUM_GALLERY]: AsyncAlbums,
};

function mapStateToProps(state) {
  return { galleryType: state.ui.galleryType };
}

const GalleryTypeApp = ({ galleryType, ...rest }) => {
  const GalleryComponent = GALLERY_MAP[galleryType];
  return <GalleryComponent {...rest} />;
};

export default connect(
  mapStateToProps,
  null,
)(GalleryTypeApp);
