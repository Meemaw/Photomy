// @flow
import * as React from 'react';
import ImageHighlight from './ImageHighlight';
import { setAuthUser } from '../../actions';
import { connect } from 'react-redux';
import { withHover } from '../../hocs';
import { ImagesApi, UserAuthApi, AlbumsApi } from '../../services';
import { fireEvent } from '../../lib/dom';
import type { Image } from '../../meta/types/Image';

type Props = {
  handleClose: Function,
  highlightedImage: Image,
  deleteImage?: Function,
  favoriteImage?: Function,
  setAuthUser: Function,
  removeFromAlbum?: ?Function,
};

type State = {
  deleting: boolean,
  favoriting: boolean,
  renderInformation: boolean,
  settingAsAvatar: boolean,
  addToAlbumOpen: boolean,
};

class ImageHighlightContainer extends React.Component<Props, State> {
  state = {
    deleting: false,
    favoriting: false,
    renderInformation: false,
    settingAsAvatar: false,
    addToAlbumOpen: false,
  };

  imgRef = null;

  removeFromAlbum = async (albumId: string, imageId: string) => {
    await AlbumsApi.removeImage({ albumId, image_id: imageId });
    if (this.props.removeFromAlbum) {
      this.props.removeFromAlbum(imageId);
    }
    this.props.handleClose();
  };

  setRenderInformation = (renderInformation: boolean) => this.setState({ renderInformation });

  handleAddToAlbumOpen = () => this.setState({ addToAlbumOpen: true });
  handleAddToAlbumClose = () => {
    this.setState({ addToAlbumOpen: false });
    setTimeout(() => fireEvent(this.imgRef, 'mouseover'), 0);
  };

  setAsAvatar = async () => {
    const { highlightedImage } = this.props;
    this.setState({ settingAsAvatar: true });
    const updatedUser = await UserAuthApi.patch({ avatar: highlightedImage.image_id });
    this.props.setAuthUser(updatedUser);
    this.setState({ settingAsAvatar: false });
  };

  handleDelete = async () => {
    const { handleClose, highlightedImage, deleteImage } = this.props;
    this.setState({ deleting: true });
    await ImagesApi.delete({ image_id: highlightedImage.image_id });
    handleClose();
    deleteImage && deleteImage(highlightedImage);
  };

  handleFavorite = async () => {
    const { highlightedImage, favoriteImage } = this.props;
    const updatedImage = { ...highlightedImage, favorite: !highlightedImage.favorite };
    this.setState({ favoriting: true });
    await ImagesApi.update(updatedImage);
    this.setState({ favoriting: false }, () => favoriteImage && favoriteImage(updatedImage));
  };

  handleRef = ref => (this.imgRef = ref);

  render() {
    return (
      <ImageHighlight
        {...this.props}
        {...this.state}
        handleRef={this.handleRef}
        setRenderInformation={this.setRenderInformation}
        imgRef={this.imgRef}
        handleDelete={this.handleDelete}
        handleFavorite={this.handleFavorite}
        setAsAvatar={this.setAsAvatar}
        handleAddToAlbumOpen={this.handleAddToAlbumOpen}
        handleAddToAlbumClose={this.handleAddToAlbumClose}
        removeFromAlbum={this.removeFromAlbum}
      />
    );
  }
}

const mapDispatchToProps = {
  setAuthUser,
};

export default withHover(
  connect(
    null,
    mapDispatchToProps,
  )(ImageHighlightContainer),
);
