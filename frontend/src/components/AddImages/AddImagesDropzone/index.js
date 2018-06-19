// @flow
import * as React from 'react';
import FileUpload from '../../common/FileUpload';
import ImageLinkUpload from '../../common/ImageLinkUpload';
import AcceptedImages from '../AcceptedImages';
import { Segment } from 'semantic-ui-react';
import { onlyUpdateForKeys } from 'recompose';

type Props = {
  isUploading: boolean,
  acceptedImages: Array<Object>,
  uploadedStatuses: Array<boolean>,
  addAcceptedImages: Function,
  removeFile: Function,
  uploadWithLink: boolean,
  isDuplicated: Function,
};

const AlbumImagesDropzone = ({
  acceptedImages,
  uploadedStatuses,
  addAcceptedImages,
  removeFile,
  isUploading,
  uploadWithLink,
  isDuplicated,
}: Props) => {
  return (
    <Segment style={{ width: 'calc(100% - 265px)', marginTop: '0px', marginLeft: '15px' }}>
      <AcceptedImages
        acceptedImages={acceptedImages}
        uploadedStatuses={uploadedStatuses}
        removeFile={removeFile}
        isUploading={isUploading}
      >
        {!uploadWithLink ? (
          <FileUpload handleAcceptedFiles={addAcceptedImages} isUploading={isUploading} />
        ) : (
          <ImageLinkUpload addAcceptedImages={addAcceptedImages} isDuplicated={isDuplicated} />
        )}
      </AcceptedImages>
    </Segment>
  );
};

export default onlyUpdateForKeys([
  'acceptedImages',
  'uploadedStatuses',
  'isUploading',
  'uploadWithLink',
])(AlbumImagesDropzone);
