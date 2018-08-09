import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';

import AddImagesDropzone from '../AddImagesDropzone';
import AddImagesOptions from '../AddImagesOptions';

type Props = {
  isUploading: boolean;
  acceptedImages: any[];
  uploadedStatuses: boolean[];
  addAcceptedImages: any;
  removeFile: (fileIx: number) => void;
  uploadWithLink: boolean;
  isDuplicated: any;
  setUploadWithLink: any;
  setRecognizePeople: any;
  recognizePeople: boolean;
  isAlbum: boolean;
  highQuality: boolean;
  setAlbumQuality: any;
  setAlbumName: any;
  albumName: string;
  photosTakenOn?: Date;
  isCustomDate: boolean;
  setIsCustomDate: any;
  handleDateSelection: any;
  setLocation: any;
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
  photosTakenOn,
  isCustomDate,
  setIsCustomDate,
  handleDateSelection,
  setLocation,
}: Props) => {
  return (
    <StyledContent className="AddAlbumContent">
      <AddImagesOptions
        setUploadWithLink={setUploadWithLink}
        uploadWithLink={uploadWithLink}
        setRecognizePeople={setRecognizePeople}
        recognizePeople={recognizePeople}
        isAlbum={isAlbum}
        highQuality={highQuality}
        setAlbumQuality={setAlbumQuality}
        setAlbumName={setAlbumName}
        photosTakenOn={photosTakenOn}
        albumName={albumName}
        isCustomDate={isCustomDate}
        setIsCustomDate={setIsCustomDate}
        handleDateSelection={handleDateSelection}
        setLocation={setLocation}
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
    </StyledContent>
  );
};

const StyledContent = styled(Modal.Content)`
  &&& {
    .AcceptedImages {
      width: 100%;
      margin: 0px;
    }

    .AcceptedImageContainer {
      position: relative;
      background: #f6f7f9;
      margin: 5px;
      padding: 25px 0px 25px 0px;
    }

    div.ui.segment {
      width: calc(100% - 265px);
      margin-top: 0px;
      margin-left: 15px;
    }

    @media only screen and (max-width: 600px) {
      div.ui.segment {
        width: calc(100% - 40px) !important;
        margin-top: 20px !important;
      }

      .FileUpload,
      .Dropzone,
      .AcceptedImageContainer,
      .AcceptedImage,
      .LinkUpload {
        width: 100% !important;
      }
    }

    @media only screen and (min-width: 600px) {
      display: flex !important;
    }
  }
`;

export default AddAlbum;
