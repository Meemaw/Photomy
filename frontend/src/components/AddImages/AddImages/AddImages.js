// @flow
import * as React from 'react';
import AddImagesHeader from '../AddImagesHeader';
import AddImagesFooter from '../AddImagesFooter';
import AddImagesContent from '../AddImagesContent';

type Props = {
  handleClose: Function,
  uploadImages: Function,
  setIsAlbum: Function,
  isAlbum: boolean,
  acceptedImages: Array<Object>,
  uploadedStatuses: Array<boolean>,
  isUploading: boolean,
  recognizePeople: boolean,
  uploadWithLink: boolean,
  highQuality: boolean,
  albumName: string,
  addAcceptedImages: Function,
  isDuplicated: Function,
  removeFile: Function,
  setUploadWithLink: Function,
  setAlbumName: Function,
  setRecognizePeople: Function,
  setAlbumQuality: Function,
  uploadImagesToServer: Function,
};

const AddImages = ({
  isAlbum,
  acceptedImages,
  uploadedStatuses,
  isUploading,
  recognizePeople,
  uploadWithLink,
  highQuality,
  handleClose,
  albumName,
  setIsAlbum,
  addAcceptedImages,
  isDuplicated,
  removeFile,
  setUploadWithLink,
  setRecognizePeople,
  setAlbumQuality,
  setAlbumName,
  uploadImagesToServer,
}: Props) => {
  return (
    <React.Fragment>
      <AddImagesHeader
        title="Create album"
        handleClose={handleClose}
        setIsAlbum={setIsAlbum}
        isAlbum={isAlbum}
      />

      <AddImagesContent
        acceptedImages={acceptedImages}
        uploadedStatuses={uploadedStatuses}
        addAcceptedImages={addAcceptedImages}
        isDuplicated={isDuplicated}
        removeFile={removeFile}
        isUploading={isUploading}
        uploadWithLink={uploadWithLink}
        setUploadWithLink={setUploadWithLink}
        setRecognizePeople={setRecognizePeople}
        recognizePeople={recognizePeople}
        isAlbum={isAlbum}
        setAlbumQuality={setAlbumQuality}
        setAlbumName={setAlbumName}
        highQuality={highQuality}
        albumName={albumName}
      />
      <AddImagesFooter
        isAlbum={isAlbum}
        acceptedImages={acceptedImages}
        isUploading={isUploading}
        uploadImagesToServer={uploadImagesToServer}
      />
    </React.Fragment>
  );
};

export default AddImages;
