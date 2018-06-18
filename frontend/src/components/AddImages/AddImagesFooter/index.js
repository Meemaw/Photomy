// @flow
import React from 'react';
import AddAlbumFooter from './AddAlbumFooter';
import { onlyUpdateForKeys } from 'recompose';

type Props = {
  isAlbum: boolean,
  isUploading: boolean,
  uploadImagesToServer: Function,
  acceptedImages: Array<Object>,
};

const AddAlbumFooterContainer = ({
  isAlbum,
  isUploading,
  acceptedImages,
  uploadImagesToServer,
}: Props) => {
  const disabled = acceptedImages.length === 0;
  return (
    <AddAlbumFooter
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
