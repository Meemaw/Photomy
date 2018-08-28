import * as React from 'react';
import { connect } from 'react-redux';

import { History } from '../../../../node_modules/@types/history';
import { fetchImages as fetchImagesAction } from '../../../actions';
import { peoplePath } from '../../../constants/paths';
import withPush from '../../../hocs/Router';
import { GalleryType } from '../../../meta/types/GalleryType';
import { ImageIdentityMatch } from '../../../meta/types/ImageIdentityMatch';
import { StoreState } from '../../../meta/types/Store';
import { ImagesApi } from '../../../services';
import Gallery from '../../Gallery';
import People from './People';

type Props = {
  history: History;
  push: any;
  images: ImageIdentityMatch[];
  count: number;
  updatedAt?: Date;
  fetchImages: any;
  isEmpty: boolean;
};

class PeopleContainer extends React.Component<Props, object> {
  componentDidMount() {
    const { fetchImages, updatedAt } = this.props;
    if (updatedAt === null) {
      fetchImages(ImagesApi.list_people, {});
    }
  }

  handleImageClick = (image: ImageIdentityMatch) => {
    this.props.push(`${peoplePath}/${image.identity_group_id}`);
  };

  render() {
    const { push, images, count, updatedAt, isEmpty } = this.props;
    return (
      <Gallery
        renderAddPhoto={false}
        isEmpty={isEmpty}
        galleryName="people"
        emptyInstructions="Add some photos with people on it to your gallery"
      >
        <People push={push} images={images} count={count} updatedAt={updatedAt} />
      </Gallery>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return { ...state.gallery[GalleryType.PEOPLE_GALLERY] };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchImages: (fetchFunction: any, args: any) =>
      dispatch(fetchImagesAction(fetchFunction, args, GalleryType.PEOPLE_GALLERY)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withPush(PeopleContainer));
