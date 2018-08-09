import * as React from 'react';
import { ButtonClick } from '../../../meta/types/Function';
import AddImagesContent from '../AddImagesContent';
import AddImagesFooter from '../AddImagesFooter';
import AddImagesHeader from '../AddImagesHeader';

type Props = {
  handleClose: any;
  uploadImages: any;
  setIsAlbum: any;
  isAlbum: boolean;
  acceptedImages: any[];
  uploadedStatuses: boolean[];
  isUploading: boolean;
  recognizePeople: boolean;
  uploadWithLink: boolean;
  highQuality: boolean;
  albumName: string;
  addAcceptedImages: any;
  isDuplicated: any;
  removeFile: (fileIx: number) => void;
  setUploadWithLink: any;
  setAlbumName: any;
  setRecognizePeople: any;
  setAlbumQuality: any;
  uploadImagesToServer: ButtonClick;
  photosTakenOn?: Date;
  isCustomDate: boolean;
  setIsCustomDate: any;
  handleDateSelection: any;
  setLocation: any;
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
  photosTakenOn,
  isCustomDate,
  setIsCustomDate,
  handleDateSelection,
  setLocation,
}: Props) => {
  return (
    <React.Fragment>
      <AddImagesHeader handleClose={handleClose} setIsAlbum={setIsAlbum} isAlbum={isAlbum} />

      <AddImagesContent
        setLocation={setLocation}
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
        isCustomDate={isCustomDate}
        setIsCustomDate={setIsCustomDate}
        highQuality={highQuality}
        albumName={albumName}
        handleDateSelection={handleDateSelection}
        photosTakenOn={photosTakenOn}
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
