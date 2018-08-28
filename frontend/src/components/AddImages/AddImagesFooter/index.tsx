import * as React from 'react';
import { onlyUpdateForKeys } from 'recompose';

import AddImagesFooter, { Props as AddImagesFooterProps } from './AddImagesFooter';

export interface Props extends AddImagesFooterProps {
  acceptedImages: any[];
}

const AddAlbumFooterContainer = ({
  isAlbum,
  isUploading,
  acceptedImages,
  uploadImagesToServer,
}: Props) => {
  const disabled = acceptedImages.length === 0;
  return (
    <AddImagesFooter
      isAlbum={isAlbum}
      isUploading={isUploading}
      uploadImagesToServer={uploadImagesToServer}
      disabled={disabled}
    />
  );
};

export default onlyUpdateForKeys(['isAlbum', 'isUploading', 'acceptedImages'])(
  AddAlbumFooterContainer,
);
