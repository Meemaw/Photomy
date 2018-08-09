import * as React from 'react';
import { connect } from 'react-redux';

import { GalleryType } from '../../meta/types/GalleryType';
import { StoreState } from '../../meta/types/Store';
import Loadable from '../common/Loadable';

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
  [GalleryType.ALL_PHOTOS_GALLERY]: AsyncAllPhotos,
  [GalleryType.PEOPLE_GALLERY]: AsyncPeople,
  [GalleryType.FAVORITE_GALLERY]: AsyncFavorite,
  [GalleryType.ALBUM_GALLERY]: AsyncAlbums,
};

function mapStateToProps(state: StoreState) {
  return { galleryType: state.ui.galleryType };
}

const GalleryTypeApp = ({ galleryType, ...rest }: any) => {
  const GalleryComponent = GALLERY_MAP[galleryType];
  return <GalleryComponent {...rest} />;
};

export default connect(
  mapStateToProps,
  null,
)(GalleryTypeApp);
