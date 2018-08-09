import * as React from 'react';
import { onlyUpdateForKeys } from 'recompose';

import { ButtonClick } from '../../../meta/types/Function';
import AddImagesFooter from './AddImagesFooter';

type Props = {
  isAlbum: boolean;
  isUploading: boolean;
  uploadImagesToServer: ButtonClick;
  acceptedImages: any[];
};

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
      uploadPhotos={uploadImagesToServer}
      disabled={disabled}
    />
  );
};

export default onlyUpdateForKeys(['isAlbum', 'isUploading', 'acceptedImages'])(
  AddAlbumFooterContainer,
);
