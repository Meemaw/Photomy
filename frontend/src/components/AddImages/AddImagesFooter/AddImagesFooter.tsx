import * as React from 'react';
import { Modal } from 'semantic-ui-react';

import { ButtonClick } from '../../../meta/types/Function';
import SaveButton from '../../common/SaveButton';

type Props = {
  isAlbum: boolean;
  isUploading: boolean;
  uploadPhotos: ButtonClick;
  disabled: boolean;
};

const AddImagesFooter = ({ isAlbum, isUploading, uploadPhotos, disabled }: Props) => {
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

export default AddImagesFooter;
