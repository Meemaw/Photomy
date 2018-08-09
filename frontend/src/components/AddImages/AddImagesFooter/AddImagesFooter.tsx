import * as React from 'react';
import { Modal } from 'semantic-ui-react';

import { ButtonClick } from '../../../meta/types/Function';
import SaveButton from '../../common/SaveButton';

export interface Props {
  isAlbum: boolean;
  isUploading: boolean;
  uploadImagesToServer: ButtonClick;
}

interface IProps extends Props {
  disabled: boolean;
}

const AddImagesFooter = ({ isAlbum, isUploading, uploadImagesToServer, disabled }: IProps) => {
  return (
    <Modal.Actions>
      <SaveButton
        onClick={uploadImagesToServer}
        loading={isUploading}
        icon="upload"
        disabled={disabled}
        content={isAlbum ? 'Create album' : 'Upload photos'}
      />
    </Modal.Actions>
  );
};

export default AddImagesFooter;
