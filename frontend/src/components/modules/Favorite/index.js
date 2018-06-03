// @flow
import React from 'react';
import Favorite from './Favorite';
import { connect } from 'react-redux';
import { FAVORITE_GALLERY } from '../../../constants/galleryTypes';
import { fetchImages as fetchImagesAction } from '../../../actions';
import { ImagesApi } from '../../../services';

type Props = {
  fetchImages: Function,
  updatedAt: Date,
  images: Array<Image>,
  count: number,
  dataMap: Object,
  isEmpty: boolean,
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
    const { images, count, updatedAt, dataMap, isEmpty } = this.props;
    return (
      <Favorite
        images={images}
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

const mapDispatchToProps = dispatch => {
  return {
    fetchImages: (fetchFunction, args) =>
      dispatch(fetchImagesAction(fetchFunction, args, FAVORITE_GALLERY)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteContainer);
