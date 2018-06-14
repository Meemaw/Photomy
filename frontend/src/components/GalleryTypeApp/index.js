// @flow
import React from 'react';
import AllPhotos from '../modules/AllPhotos';
import People from '../modules/People';
import Favorite from '../modules/Favorite';
import { connect } from 'react-redux';
import { ALL_PHOTOS_GALLERY, PEOPLE_GALLERY, FAVORITE_GALLERY } from '../../constants/galleryTypes';

const GALLERY_MAP = {
  [ALL_PHOTOS_GALLERY]: AllPhotos,
  [PEOPLE_GALLERY]: People,
  [FAVORITE_GALLERY]: Favorite,
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
