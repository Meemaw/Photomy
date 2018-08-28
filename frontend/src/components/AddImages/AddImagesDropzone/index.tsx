import * as React from 'react';
import { onlyUpdateForKeys } from 'recompose';
import { Segment } from 'semantic-ui-react';

import { Uploadable } from '../../../meta/types/Interfaces';
import FileUpload from '../../common/FileUpload';
import ImageLinkUpload from '../../common/ImageLinkUpload';
import AcceptedImages from '../AcceptedImages';

type Props = {
  isUploading: boolean;
  acceptedImages: any[];
  uploadedStatuses: boolean[];
  addAcceptedImages: (imageFiles: Uploadable[]) => void;
  removeFile: (fileIx: number) => void;
  uploadWithLink: boolean;
  isDuplicated: any;
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
    <Segment>
      <AcceptedImages
        acceptedImages={acceptedImages}
        uploadedStatuses={uploadedStatuses}
        removeFile={removeFile}
        isUploading={isUploading}
      >
        {!uploadWithLink ? (
          <FileUpload handleAcceptedFiles={addAcceptedImages} />
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
