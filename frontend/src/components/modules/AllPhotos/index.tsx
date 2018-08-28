import { groupBy } from 'lodash';
import * as React from 'react';

import { withImageHighlight } from '../../../hocs';
import { toReadableDate } from '../../../lib/date';
import { GalleryType } from '../../../meta/types/GalleryType';
import { ImageMap } from '../../../meta/types/Image';
import { StoreState } from '../../../meta/types/Store';
import { ImagesApi } from '../../../services';
import AllPhotos from './AllPhotos';

type Props = {
  fetchImages: any;
  count: number;
  updatedAt?: Date;
  images: any;
  dataMap: ImageMap;
  deleteImage: any;
  favoriteImage: any;
  isEmpty: boolean;
  totalCount: number;
  fetchingImages: boolean;
  hasMore: boolean;
};

class AllPhotosContainer extends React.PureComponent<Props, object> {
  componentDidMount() {
    const { fetchImages, updatedAt } = this.props;
    if (updatedAt === null) {
      fetchImages(ImagesApi.list_images, { ordering: '-uploaded_at' });
    }
  }

  loadMore = () => {
    const { fetchImages, count, fetchingImages, hasMore } = this.props;
    if (hasMore && !fetchingImages) {
      fetchImages(ImagesApi.list_images, {
        ordering: '-uploaded_at',
        offset: count,
      });
    }
  };

  render() {
    const {
      count,
      updatedAt,
      images,
      dataMap,
      deleteImage,
      favoriteImage,
      isEmpty,
      fetchingImages,
      hasMore,
    } = this.props;
    return (
      <AllPhotos
        count={count}
        images={images}
        updatedAt={updatedAt}
        dataMap={dataMap}
        deleteImage={deleteImage}
        favoriteImage={favoriteImage}
        isEmpty={isEmpty}
        loadMore={this.loadMore}
        fetchingImages={fetchingImages}
        hasMore={hasMore}
      />
    );
  }
}

function mapStateToProps(state: StoreState) {
  const data = state.gallery[GalleryType.ALL_PHOTOS_GALLERY];
  const actualImages = groupBy(data.images, image => toReadableDate(image.uploaded_at));
  return { ...data, images: actualImages };
}

export default withImageHighlight(
  AllPhotosContainer,
  mapStateToProps,
  GalleryType.ALL_PHOTOS_GALLERY,
);
