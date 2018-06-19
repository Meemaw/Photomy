// @flow
import * as React from 'react';
import AddImages from './AddImages';
import { ImagesApi, AlbumsApi } from '../../../services';
import { albumsPath } from '../../../lib/paths';

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
};

class AddImagesContainer extends React.Component<Props, State> {
  state = INITIAL_STATE;

  setAlbumQuality = (highQuality: boolean) => this.setState({ highQuality });
  setRecognizePeople = (recognizePeople: boolean) => this.setState({ recognizePeople });
  setIsAlbum = (isAlbum: boolean) => this.setState({ isAlbum });
  setAlbumName = (albumName: string) => this.setState({ albumName });

  isDuplicated = (src: string) => {
    const { acceptedImages } = this.state;
    return acceptedImages.filter(acceptedImage => acceptedImage.preview === src).length > 0;
  };

  uploadFile = async (file: File, albumId: ?string): Promise<*> => {
    const formData = new FormData();
    formData.append('file', file);
    if (albumId) {
      formData.append('albumId', albumId);
    }
    return ImagesApi.upload_image_file(formData, true);
  };

  uploadLink = async (image_url: string, albumId: ?string): Promise<*> => {
    let payload = { image_url };
    if (albumId) {
      payload = { ...payload, albumId };
    }
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
    const { acceptedImages, uploadedStatuses, isAlbum, albumName } = this.state;
    const { uploadImages, userId } = this.props;
    let albumId = null;

    if (isAlbum) {
      const album = await AlbumsApi.create({ name: albumName, user: userId });
      albumId = album.id;
    }

    await Promise.all(
      acceptedImages.map(async (file, fileIx) => {
        if (!uploadedStatuses[fileIx]) {
          const promise = file.isLink
            ? this.uploadLink(file.preview, albumId)
            : this.uploadFile(file, albumId);

          promise
            .then(resp => {
              const image = { ...resp, uploaded_at: new Date(resp.uploaded_at) };
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

    if (albumId) {
      this.props.push(`${albumsPath}/${albumId}`);
    } else {
      this.props.handleClose();
    }
  };

  render() {
    return (
      <AddImages
        {...this.state}
        {...this.props}
        setAlbumName={this.setAlbumName}
        setIsAlbum={this.setIsAlbum}
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
