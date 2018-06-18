// @flow
import * as React from 'react';
import AddImagesOptions from '../AddImagesOptions';
import AddImagesDropzone from '../AddImagesDropzone';
import { Modal } from 'semantic-ui-react';

type Props = {
  isUploading: boolean,
  acceptedImages: Array<Object>,
  uploadedStatuses: Array<boolean>,
  addAcceptedImages: Function,
  removeFile: Function,
  uploadWithLink: boolean,
  isDuplicated: Function,
  setUploadWithLink: Function,
  setRecognizePeople: Function,
  recognizePeople: boolean,
  isAlbum: boolean,
  highQuality: boolean,
  setAlbumQuality: Function,
  setAlbumName: Function,
  albumName: string,
};

const AddAlbum = ({
  acceptedImages,
  uploadedStatuses,
  addAcceptedImages,
  removeFile,
  isUploading,
  uploadWithLink,
  isDuplicated,
  setUploadWithLink,
  setRecognizePeople,
  recognizePeople,
  isAlbum,
  setAlbumQuality,
  setAlbumName,
  highQuality,
  albumName,
}: Props) => {
  return (
    <Modal.Content style={{ display: 'flex' }}>
      <AddImagesOptions
        setUploadWithLink={setUploadWithLink}
        uploadWithLink={uploadWithLink}
        setRecognizePeople={setRecognizePeople}
        recognizePeople={recognizePeople}
        isAlbum={isAlbum}
        highQuality={highQuality}
        setAlbumQuality={setAlbumQuality}
        setAlbumName={setAlbumName}
        albumName={albumName}
      />
      <AddImagesDropzone
        acceptedImages={acceptedImages}
        addAcceptedImages={addAcceptedImages}
        isDuplicated={isDuplicated}
        uploadWithLink={uploadWithLink}
        removeFile={removeFile}
        uploadedStatuses={uploadedStatuses}
        isUploading={isUploading}
      />
    </Modal.Content>
  );
};

export default AddAlbum;
