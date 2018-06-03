// @flow
import * as React from 'react';
import AllPhotos from './AllPhotos';
import { groupBy } from 'lodash';
import { ImagesApi } from '../../../services';
import { toReadableDate } from '../../../lib/date';
import { ALL_PHOTOS_GALLERY } from '../../../constants/galleryTypes';
import { withImageHighlight } from '../../../hocs';

type Props = {
  fetchImages: Function,
  count: number,
  updatedAt: ?Date,
  images: Object,
  dataMap: Object,
  deleteImage: Function,
  favoriteImage: Function,
  isEmpty: boolean,
};

type State = {};

class AllPhotosContainer extends React.PureComponent<Props, State> {
  componentDidMount() {
    const { fetchImages, updatedAt } = this.props;
    if (updatedAt === null) {
      fetchImages(ImagesApi.list_images, { ordering: '-uploaded_at' });
    }
  }

  render() {
    const { count, updatedAt, images, dataMap, deleteImage, favoriteImage, isEmpty } = this.props;
    return (
      <AllPhotos
        count={count}
        images={images}
        updatedAt={updatedAt}
        dataMap={dataMap}
        deleteImage={deleteImage}
        favoriteImage={favoriteImage}
        isEmpty={isEmpty}
      />
    );
  }
}

function mapStateToProps(state) {
  const data = state.gallery[ALL_PHOTOS_GALLERY];
  const actualImages = groupBy(data.images, image => toReadableDate(image.uploaded_at));
  return { ...data, images: actualImages };
}

export default withImageHighlight(AllPhotosContainer, mapStateToProps, ALL_PHOTOS_GALLERY);
