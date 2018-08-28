import * as React from 'react';
import { connect } from 'react-redux';

import { setGalleryType, uploadImages } from '../../actions';
import { HOC } from '../../meta/types/Hoc';

export interface WithUploadProps {
  uploadImages: any;
}

const withUploading = <P, S>(WrappedComponent: HOC<P, WithUploadProps>) => {
  const C = class WithUploading extends React.Component<P & WithUploadProps, S> {
    render() {
      return <WrappedComponent {...this.props} uploadImages={this.props.uploadImages} />;
    }
  };

  const mapDispatchToProps = {
    uploadImages,
    setGalleryType,
  };

  return connect(
    null,
    mapDispatchToProps,
  )(C);
};

export default withUploading;
