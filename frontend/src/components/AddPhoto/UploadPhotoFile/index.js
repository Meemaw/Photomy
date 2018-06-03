// @flow
import React from 'react';
import FileUpload from '../../common/FileUpload';
import { ImagesApi } from '../../../services';
import { withUploading } from '../../../hocs';
import type { File } from '../../../meta/types/File';

type Props = { uploadImages: Function };
type State = {};

class UploadPhotoFileContainer extends React.Component<Props, State> {
  uploadFile = async (file: File): Promise<*> => {
    const formData = new FormData();
    formData.append('file', file);
    const promise = ImagesApi.upload_image_file(formData, true);

    promise.then(resp => {
      const uploadedImage = { ...resp, uploaded_at: new Date(resp.uploaded_at) };
      this.props.uploadImages([uploadedImage]);
    });

    return promise;
  };

  render() {
    return (
      <div>
        <FileUpload uploadFile={this.uploadFile} />
      </div>
    );
  }
}

export default withUploading(UploadPhotoFileContainer);
