// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  deleteImage as deleteImageAction,
  favoriteImage as favoriteImageAction,
  fetchImages as fetchImagesAction,
} from '../../actions';

type Props = { fetchImages: Function, deleteImage: Function, favoriteImage: Function };
type State = {};

// TODO actions should apply to all galleries (delete, favorite)

const withImageHighlight = (
  WrappedComponent: any,
  mapStateToProps: Function,
  galleryType: string,
) => {
  const C = class WithImageHighlight extends React.PureComponent<Props, State> {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  const mapDispatchToProps = dispatch => {
    return {
      fetchImages: (fetchFunction, args) =>
        dispatch(fetchImagesAction(fetchFunction, args, galleryType)),
      deleteImage: image => dispatch(deleteImageAction(image, galleryType)),
      favoriteImage: image => dispatch(favoriteImageAction(image, galleryType)),
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(C);
};

export default withImageHighlight;
