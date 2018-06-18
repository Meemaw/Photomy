// @flow
import React from 'react';
import SaveButton from '../../common/SaveButton';
import { Modal } from 'semantic-ui-react';

type Props = {
  isAlbum: boolean,
  isUploading: boolean,
  uploadPhotos: Function,
  disabled: boolean,
};

const AddAlbumFooter = ({ isAlbum, isUploading, uploadPhotos, disabled }: Props) => {
  return (
    <Modal.Actions>
      <SaveButton
        onClick={uploadPhotos}
        loading={isUploading}
        icon="upload"
        disabled={disabled}
        content={isAlbum ? 'Create album' : 'Upload photos'}
      />
    </Modal.Actions>
  );
};

export default AddAlbumFooter;
