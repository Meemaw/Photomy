// @flow
import React from 'react';
import UrlUpload from '../../common/UrlUpload';
import { ImagesApi } from '../../../services';
import { withUploading } from '../../../hocs';

type Props = { uploadImages: Function };
type State = {};

class UploadPhotoUrl extends React.Component<Props, State> {
  uploadPhoto = (url: string): Promise<*> => {
    return ImagesApi.upload_url({ image_url: url }).then(resp => {
      const uploadedImage = { ...resp, uploaded_at: new Date(resp.uploaded_at) };
      this.props.uploadImages([uploadedImage]);
      return resp;
    });
  };

  render() {
    return <UrlUpload uploadPhoto={this.uploadPhoto} />;
  }
}

export default withUploading(UploadPhotoUrl);
