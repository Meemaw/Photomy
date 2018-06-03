// @flow
import * as React from 'react';
import ImageHighlight from './ImageHighlight';
import { withHover } from '../../hocs';
import { ImagesApi } from '../../services';
import type { Image } from '../../meta/types/Image';

type Props = {
  handleClose: Function,
  highlightedImage: Image,
  deleteImage: Function,
  favoriteImage: Function,
};

type State = { deleting: boolean, favoriting: boolean };

class ImageHighlightContainer extends React.Component<Props, State> {
  state = { deleting: false, favoriting: false };

  handleDelete = async () => {
    const { handleClose, highlightedImage, deleteImage } = this.props;
    this.setState({ deleting: true });
    await ImagesApi.delete({ image_id: highlightedImage.image_id });
    handleClose();
    deleteImage(highlightedImage);
  };

  handleFavorite = async () => {
    const { highlightedImage, favoriteImage } = this.props;
    const updatedImage = { ...highlightedImage, favorite: !highlightedImage.favorite };
    this.setState({ favoriting: true });
    await ImagesApi.update(updatedImage);
    this.setState({ favoriting: false }, () => favoriteImage(updatedImage));
  };

  render() {
    return (
      <ImageHighlight
        {...this.props}
        {...this.state}
        handleDelete={this.handleDelete}
        handleFavorite={this.handleFavorite}
      />
    );
  }
}

export default withHover(ImageHighlightContainer);
