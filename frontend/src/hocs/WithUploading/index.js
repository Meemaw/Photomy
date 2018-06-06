import React from 'react';
import { connect } from 'react-redux';
import { uploadImages, setGalleryType } from '../../actions';

const mapDispatchToProps = {
  uploadImages,
  setGalleryType,
};

const withUploading = WrappedComponent => {
  const C = class WithUploading extends React.PureComponent {
    render() {
      return <WrappedComponent {...this.props} uploadImages={this.props.uploadImages} />;
    }
  };

  return connect(
    null,
    mapDispatchToProps,
  )(C);
};

export default withUploading;
