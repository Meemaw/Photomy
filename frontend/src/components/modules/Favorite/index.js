// @flow
import * as React from 'react';
import Favorite from './Favorite';
import { FAVORITE_GALLERY } from '../../../constants/galleryTypes';
import { ImagesApi } from '../../../services';
import { withImageHighlight } from '../../../hocs';
import type { Image } from '../../../meta/types/Image';

type Props = {
  fetchImages: Function,
  updatedAt: Date,
  images: Array<Image>,
  count: number,
  dataMap: Object,
  isEmpty: boolean,
  favoriteImage: Function,
  deleteImage: Function,
};
type State = {};

class FavoriteContainer extends React.Component<Props, State> {
  componentDidMount() {
    const { fetchImages, updatedAt } = this.props;

    if (updatedAt === null) {
      fetchImages(ImagesApi.favorites, {});
    }
  }

  render() {
    const { images, count, updatedAt, dataMap, isEmpty, favoriteImage, deleteImage } = this.props;
    return (
      <Favorite
        images={images}
        favoriteImage={favoriteImage}
        deleteImage={deleteImage}
        count={count}
        updatedAt={updatedAt}
        dataMap={dataMap}
        isEmpty={isEmpty}
      />
    );
  }
}

function mapStateToProps(state) {
  return { ...state.gallery[FAVORITE_GALLERY] };
}

export default withImageHighlight(FavoriteContainer, mapStateToProps, FAVORITE_GALLERY);
