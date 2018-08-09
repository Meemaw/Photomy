import * as React from 'react';

import { albumsPath } from '../../../constants/paths';
import { toUploadFormat } from '../../../lib/date';
import { mapImage } from '../../../meta/types/Image';
import { AlbumsApi, ImagesApi } from '../../../services';
import AddImages from './AddImages';

export type Props = {
  handleClose: (e: React.SyntheticEvent<any>) => void;
  uploadImages: any;
  userId: string;
  push: any;
};

type State = {
  albumName: string;
  isAlbum: boolean;
  highQuality: boolean;
  uploadedStatuses: boolean[];
  acceptedImages: any[];
  recognizePeople: boolean;
  isUploading: boolean;
  uploadWithLink: boolean;
  photosTakenOn?: Date;
  isCustomDate: boolean;
  location: string;
};

const INITIAL_STATE = {
  albumName: '',
  isAlbum: false,
  highQuality: true,
  uploadedStatuses: [],
  acceptedImages: [],
  recognizePeople: true,
  isUploading: false,
  uploadWithLink: false,
  photosTakenOn: undefined,
  isCustomDate: false,
  location: '',
};

class AddImagesContainer extends React.Component<Props, State> {
  state = INITIAL_STATE;

  setIsCustomDate = (isCustomDate: boolean) => this.setState({ isCustomDate });
  setAlbumQuality = (highQuality: boolean) => this.setState({ highQuality });
  setRecognizePeople = (recognizePeople: boolean) => this.setState({ recognizePeople });
  setIsAlbum = (isAlbum: boolean) => this.setState({ isAlbum });
  setAlbumName = (albumName: string) => this.setState({ albumName });
  handleDateSelection = (photosTakenOn: Date) => this.setState({ photosTakenOn });
  setLocation = (location: string) => this.setState({ location });

  isDuplicated = (src: string) => {
    const { acceptedImages } = this.state;
    return acceptedImages.filter((acceptedImage: any) => acceptedImage.preview === src).length > 0;
  };

  uploadFile = async (file: File, extraData: any): Promise<any> => {
    const payload: any = { file, ...extraData };
    return ImagesApi.upload_image_file(payload, true);
  };

  uploadLink = async (imageUrl: string, extraData: any): Promise<any> => {
    const payload = { image_url: imageUrl, ...extraData };
    return ImagesApi.upload_url(payload);
  };

  setIsUploadingImages = (isUploading: boolean) => this.setState({ isUploading });

  setImageUploaded = (fileIx: number) => {
    const { uploadedStatuses } = this.state;
    const updatedUploadedStatuses: boolean[] = [...uploadedStatuses];
    updatedUploadedStatuses[fileIx] = true;
    this.setState({ uploadedStatuses: updatedUploadedStatuses });
  };

  addAcceptedImages = (newAcceptedImages: any[]) => {
    const { acceptedImages, uploadedStatuses } = this.state;
    const mergedAccepted: any[] = [...acceptedImages, ...newAcceptedImages];

    const mergedUploaded = [
      ...uploadedStatuses,
      ...[...Array(newAcceptedImages.length).keys()].map(_ => false),
    ];

    this.setState({
      acceptedImages: mergedAccepted,
      uploadedStatuses: mergedUploaded,
    });
  };

  removeFile = (fileIx: number) => {
    const { acceptedImages, uploadedStatuses } = this.state;
    const filteredFiles = [...acceptedImages];
    filteredFiles.splice(fileIx, 1);
    const filteredUploaded = [...uploadedStatuses];
    filteredUploaded.splice(fileIx, 1);
    return this.setState({
      acceptedImages: filteredFiles,
      uploadedStatuses: filteredUploaded,
    });
  };

  setUploadWithLink = (uploadWithLink: boolean) => this.setState({ uploadWithLink });

  uploadImagesToServer = async (e: any) => {
    this.setIsUploadingImages(true);
    const {
      acceptedImages,
      uploadedStatuses,
      isAlbum,
      albumName,
      recognizePeople,
      isCustomDate,
      photosTakenOn,
      location,
    } = this.state;
    const { uploadImages, userId } = this.props;

    const takenOn: Date = isCustomDate && photosTakenOn ? photosTakenOn : new Date();
    const extraData: any = {
      recognizePeople,
      taken_on: toUploadFormat(takenOn),
      location,
    };

    if (isAlbum) {
      const album = await AlbumsApi.create({ name: albumName, user: userId });
      extraData.albumId = album.id;
    }

    await Promise.all(
      acceptedImages.map(async (file: any, fileIx: number) => {
        if (!uploadedStatuses[fileIx]) {
          const promise = file.isLink
            ? this.uploadLink(file.preview, extraData)
            : this.uploadFile(file, extraData);

          promise
            .then(resp => {
              const image = mapImage(resp);
              this.setImageUploaded(fileIx);
              uploadImages([image]);
            })
            .catch(err => {
              // console.log(err);
            });

          return promise;
        } else {
          return Promise.resolve();
        }
      }),
    );

    if (extraData.albumId) {
      this.props.push(`${albumsPath}/${extraData.albumId}`);
    } else {
      this.props.handleClose(e);
    }
  };

  render() {
    return (
      <AddImages
        {...this.state}
        {...this.props}
        handleDateSelection={this.handleDateSelection}
        setAlbumName={this.setAlbumName}
        setIsAlbum={this.setIsAlbum}
        setLocation={this.setLocation}
        setIsCustomDate={this.setIsCustomDate}
        setRecognizePeople={this.setRecognizePeople}
        setAlbumQuality={this.setAlbumQuality}
        uploadImagesToServer={this.uploadImagesToServer}
        setUploadWithLink={this.setUploadWithLink}
        removeFile={this.removeFile}
        addAcceptedImages={this.addAcceptedImages}
        isDuplicated={this.isDuplicated}
      />
    );
  }
}

export default AddImagesContainer;
