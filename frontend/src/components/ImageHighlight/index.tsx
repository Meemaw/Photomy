import * as React from 'react';
import { connect } from 'react-redux';
import { setAlbumCoverImage, setAuthUser } from '../../actions';
import { withHover } from '../../hocs';
import { fireEvent } from '../../lib/dom';
import { Image } from '../../meta/types/Image';
import { AlbumsApi, ImagesApi, UserAuthApi } from '../../services';
import ImageHighlight from './ImageHighlight';

type Props = {
  handleClose: (e: React.SyntheticEvent<any>) => void;
  highlightedImage: Image;
  deleteImage?: any;
  favoriteImage?: any;
  setAuthUser: any;
  removeFromAlbum?: any;
  setAlbumCoverImage: any;
  handleLeftClick: any;
  handleRightClick: any;
  hovered?: boolean;
  count: number;
  imageSelectedIx: number;
  highlightHeaderProvider: any;
};

type State = {
  deleting: boolean;
  favoriting: boolean;
  renderInformation: boolean;
  settingAsAvatar: boolean;
  addToAlbumOpen: boolean;
};

class ImageHighlightContainer extends React.Component<Props, State> {
  state = {
    deleting: false,
    favoriting: false,
    renderInformation: false,
    settingAsAvatar: false,
    addToAlbumOpen: false,
  };

  imgRef?: React.Ref<any>;

  removeFromAlbum = async (e: any, albumId: string, imageId: string) => {
    await AlbumsApi.removeImage({ albumId, image_id: imageId });
    if (this.props.removeFromAlbum) {
      this.props.removeFromAlbum(imageId);
    }
    this.props.handleClose(e);
  };

  setAsAlbumCoverPhoto = async (albumId: string, imageId: string) => {
    const image = await AlbumsApi.setCoverImage({ albumId, image_id: imageId });
    this.props.setAlbumCoverImage(albumId, image.image_url);
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
    const updatedUser = await UserAuthApi.patch({
      avatar: highlightedImage.image_id,
    });
    this.props.setAuthUser(updatedUser);
    this.setState({ settingAsAvatar: false });
  };

  handleDelete = async (e: any) => {
    const { handleClose, highlightedImage, deleteImage } = this.props;
    this.setState({ deleting: true });
    await ImagesApi.delete({ image_id: highlightedImage.image_id });
    handleClose(e);
    if (deleteImage) {
      return deleteImage(highlightedImage);
    }
  };

  handleFavorite = async () => {
    const { highlightedImage, favoriteImage } = this.props;
    const updatedImage = {
      ...highlightedImage,
      favorite: !highlightedImage.favorite,
    };
    this.setState({ favoriting: true });
    await ImagesApi.update(updatedImage);
    this.setState({ favoriting: false }, () => favoriteImage && favoriteImage(updatedImage));
  };

  handleRef = (ref: React.Ref<any>) => (this.imgRef = ref);

  render() {
    const {
      highlightedImage,
      hovered,
      handleLeftClick,
      handleRightClick,
      handleClose,
      count,
      imageSelectedIx,
      highlightHeaderProvider,
    } = this.props;
    const { deleting, favoriting, renderInformation, settingAsAvatar, addToAlbumOpen } = this.state;
    return (
      <ImageHighlight
        renderInformation={renderInformation}
        addToAlbumOpen={addToAlbumOpen}
        settingAsAvatar={settingAsAvatar}
        highlightedImage={highlightedImage}
        favoriting={favoriting}
        deleting={deleting}
        imageSelectedIx={imageSelectedIx}
        highlightHeaderProvider={highlightHeaderProvider}
        handleLeftClick={handleLeftClick}
        handleRightClick={handleRightClick}
        handleClose={handleClose}
        hovered={hovered!}
        count={count}
        handleRef={this.handleRef}
        setRenderInformation={this.setRenderInformation}
        imgRef={this.imgRef}
        handleDelete={this.handleDelete}
        handleFavorite={this.handleFavorite}
        setAsAvatar={this.setAsAvatar}
        handleAddToAlbumOpen={this.handleAddToAlbumOpen}
        handleAddToAlbumClose={this.handleAddToAlbumClose}
        removeFromAlbum={this.removeFromAlbum}
        setAsAlbumCoverPhoto={this.setAsAlbumCoverPhoto}
      />
    );
  }
}

const mapDispatchToProps = {
  setAuthUser,
  setAlbumCoverImage,
};

const connected = connect(
  null,
  mapDispatchToProps,
)(ImageHighlightContainer);

export default withHover(connected);
