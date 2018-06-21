// @flow
import React from 'react';
import BaseModal from '../common/BaseModal';
import GalleryImage from '../Gallery/GalleryImage';
import type { Image } from '../../meta/types/Image';
import ImageHighlight from '../ImageHighlight';
import { ARROW_RIGHT, ARROW_LEFT } from '../../meta/events/keyboard';
import { ALL_PHOTOS_IMAGE_HEIGHT } from '../../constants/gallerySizes';

type Props = {
  initialImage: Image,
  imageIx: number,
  images: Array<Image>,
  highlightHeaderProvider: Function,
  triggerImageMaxHeight: number,
  deleteImage?: Function,
  favoriteImage?: Function,
};

type State = { imageSelectedIx: number };

class ImageHighlightModal extends React.PureComponent<Props, State> {
  state = { imageSelectedIx: 0 };

  handleKeyDown = (event: SyntheticKeyboardEvent<>) => {
    if (event.keyCode === ARROW_LEFT) this.handleLeftClick();
    else if (event.keyCode === ARROW_RIGHT) {
      this.handleRightClick();
    }
  };

  static defaultProps = {
    highlightHeaderProvider: () => 'Gallery Photos',
    triggerImageMaxHeight: ALL_PHOTOS_IMAGE_HEIGHT,
  };

  handleLeftClick = () => {
    const count = this.props.images.length;
    const { imageSelectedIx } = this.state;
    const newImageSelectedIx = imageSelectedIx === 0 ? count - 1 : imageSelectedIx - 1;
    this.setState({ imageSelectedIx: newImageSelectedIx });
  };

  handleRightClick = () => {
    const count = this.props.images.length;
    const { imageSelectedIx } = this.state;
    this.setState({ imageSelectedIx: (imageSelectedIx + 1) % count });
  };

  renderTrigger = (handleOpen: void => void) => {
    const { initialImage, imageIx, triggerImageMaxHeight } = this.props;

    return (
      <GalleryImage
        height="100%"
        width="100%"
        style={{ maxHeight: triggerImageMaxHeight }}
        src={initialImage.preview_url}
        onClick={() => this.setState({ imageSelectedIx: imageIx }, _ => handleOpen())}
      />
    );
  };

  render() {
    const { imageSelectedIx } = this.state;
    const { images, highlightHeaderProvider, deleteImage, favoriteImage } = this.props;
    const highlightedImage = images[imageSelectedIx];
    

    return (
      <BaseModal basic size="large" trigger={this.renderTrigger} handleKeyDown={this.handleKeyDown}>
        {handleClose => (
          <ImageHighlight
            count={images.length}
            imageSelectedIx={imageSelectedIx}
            handleClose={handleClose}
            highlightedImage={highlightedImage}
            handleRightClick={this.handleRightClick}
            handleLeftClick={this.handleLeftClick}
            highlightHeaderProvider={highlightHeaderProvider}
            deleteImage={deleteImage}
            favoriteImage={favoriteImage}
          />
        )}
      </BaseModal>
    );
  }
}

export default ImageHighlightModal;
