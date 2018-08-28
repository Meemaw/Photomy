import * as React from 'react';

import { withImageHighlight } from '../../../hocs';
import { GalleryType } from '../../../meta/types/GalleryType';
import { Image, ImageMap } from '../../../meta/types/Image';
import { StoreState } from '../../../meta/types/Store';
import { ImagesApi } from '../../../services';
import Favorite from './Favorite';

type Props = {
  fetchImages: any;
  updatedAt: Date;
  images: Image[];
  count: number;
  dataMap: ImageMap;
  isEmpty: boolean;
  favoriteImage: any;
  deleteImage: any;
};

class FavoriteContainer extends React.Component<Props, object> {
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

function mapStateToProps(state: StoreState) {
  return { ...state.gallery[GalleryType.FAVORITE_GALLERY] };
}

export default withImageHighlight(FavoriteContainer, mapStateToProps, GalleryType.FAVORITE_GALLERY);
