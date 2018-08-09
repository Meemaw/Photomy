import * as React from 'react';
import { connect } from 'react-redux';

import { Dispatch } from '../../../node_modules/redux';
import {
  deleteImage as deleteImageAction,
  favoriteImage as favoriteImageAction,
  fetchImages as fetchImagesAction,
} from '../../actions';
import { GalleryType } from '../../meta/types/GalleryType';
import { HOC } from '../../meta/types/Hoc';
import { Image } from '../../meta/types/Image';

type Props = {
  fetchImages: any;
  deleteImage: any;
  favoriteImage: any;
};

// TODO actions should apply to all galleries (delete, favorite)

const withImageHighlight = <P, S>(
  WrappedComponent: HOC<P, S>,
  mapStateToProps: any,
  galleryType: GalleryType,
) => {
  const C = class WithImageHighlight extends React.PureComponent<Props, object> {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      fetchImages: (fetchFunction: any, args: any) =>
        dispatch(fetchImagesAction(fetchFunction, args, galleryType)),
      deleteImage: (image: Image) => dispatch(deleteImageAction(image, galleryType)),
      favoriteImage: (image: Image) => dispatch(favoriteImageAction(image)),
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(C);
};

export default withImageHighlight;
