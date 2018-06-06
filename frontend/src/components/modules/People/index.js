// @flow
import * as React from 'react';
import Gallery from '../../Gallery';
import People from './People';
import withPush from '../../../hocs/Router';
import type { Image } from '../../../meta/types/Image';
import { connect } from 'react-redux';
import { ImagesApi } from '../../../services';
import { peoplePath } from '../../../lib/paths';
import { PEOPLE_GALLERY } from '../../../constants/galleryTypes';
import { fetchImages as fetchImagesAction } from '../../../actions';

type Props = {
  history: Object,
  push: string => void,
  images: Array<Image>,
  count: number,
  updatedAt: ?Date,
  fetchImages: Function,
  isEmpty: boolean,
};

type State = {};

class PeopleContainer extends React.Component<Props, State> {
  componentDidMount() {
    const { fetchImages, updatedAt } = this.props;
    if (updatedAt === null) {
      fetchImages(ImagesApi.list_people, {});
    }
  }

  handleImageClick = (image: Image) => {
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

function mapStateToProps(state) {
  return { ...state.gallery[PEOPLE_GALLERY] };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchImages: (fetchFunction, args) =>
      dispatch(fetchImagesAction(fetchFunction, args, PEOPLE_GALLERY)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withPush(PeopleContainer));
