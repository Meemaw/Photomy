// @flow
import * as React from 'react';
import AddImages from './AddImages';
import { toUploadFormat } from '../../../lib/date';
import { ImagesApi, AlbumsApi } from '../../../services';
import { albumsPath } from '../../../lib/paths';
import { mapImage } from '../../../meta/types/Image';

type Props = {
  handleClose: Function,
  uploadImages: Function,
  userId: string,
  push: Function,
};

type State = {
  albumName: string,
  isAlbum: boolean,
  highQuality: boolean,
  uploadedStatuses: Array<boolean>,
  acceptedImages: Array<Object>,
  recognizePeople: boolean,
  isUploading: boolean,
  uploadWithLink: boolean,
  photosTakenOn: ?Date,
  isCustomDate: boolean,
  location: ?string,
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
  photosTakenOn: null,
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
  handleDateSelection = (photosTakenOn: ?Date) => this.setState({ photosTakenOn });
  setLocation = (location: string) => this.setState({ location });

  isDuplicated = (src: string) => {
    const { acceptedImages } = this.state;
    return acceptedImages.filter(acceptedImage => acceptedImage.preview === src).length > 0;
  };

  uploadFile = async (file: File, extraData: Object): Promise<*> => {
    const payload: Object = { file, ...extraData };
    return ImagesApi.upload_image_file(payload, true);
  };

  uploadLink = async (image_url: string, extraData: Object): Promise<*> => {
    let payload = { image_url, ...extraData };
    return ImagesApi.upload_url(payload);
  };

  setIsUploadingImages = (isUploading: boolean) => this.setState({ isUploading });

  setImageUploaded = (fileIx: number) => {
    const { uploadedStatuses } = this.state;
    const updatedUploadedStatuses = [...uploadedStatuses];
    updatedUploadedStatuses[fileIx] = true;
    this.setState({ uploadedStatuses: updatedUploadedStatuses });
  };

  addAcceptedImages = (newAcceptedImages: Array<Object>) => {
    const { acceptedImages, uploadedStatuses } = this.state;
    const mergedAccepted = [...acceptedImages, ...newAcceptedImages];

    const mergedUploaded = [
      ...uploadedStatuses,
      ...[...Array(newAcceptedImages.length).keys()].map(_ => false),
    ];

    this.setState({ acceptedImages: mergedAccepted, uploadedStatuses: mergedUploaded });
  };

  removeFile = (fileIx: number) => {
    const { acceptedImages, uploadedStatuses } = this.state;
    const filteredFiles = [...acceptedImages];
    filteredFiles.splice(fileIx, 1);
    const filteredUploaded = [...uploadedStatuses];
    filteredUploaded.splice(fileIx, 1);
    return this.setState({ acceptedImages: filteredFiles, uploadedStatuses: filteredUploaded });
  };

  setUploadWithLink = (uploadWithLink: boolean) => this.setState({ uploadWithLink });

  uploadImagesToServer = async () => {
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

    const taken_on: Date = isCustomDate && photosTakenOn ? photosTakenOn : new Date();
    let extraData: Object = { recognizePeople, taken_on: toUploadFormat(taken_on), location };

    if (isAlbum) {
      const album = await AlbumsApi.create({ name: albumName, user: userId });
      extraData.albumId = album.id;
    }

    await Promise.all(
      acceptedImages.map(async (file, fileIx) => {
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
            .catch(err => console.log(err));

          return promise;
        } else {
          return Promise.resolve();
        }
      }),
    );

    if (extraData.albumId) {
      this.props.push(`${albumsPath}/${extraData.albumId}`);
    } else {
      this.props.handleClose();
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
