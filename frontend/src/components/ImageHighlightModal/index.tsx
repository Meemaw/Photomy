import * as React from 'react';
import { ALL_PHOTOS_IMAGE_HEIGHT } from '../../constants/gallerySizes';
import { ARROW_LEFT, ARROW_RIGHT } from '../../meta/events/keyboard';
import { Image } from '../../meta/types/Image';
import BaseModal from '../common/BaseModal';
import GalleryImage from '../Gallery/GalleryImage';
import ImageHighlight from '../ImageHighlight';

type Props = {
  initialImage: Image;
  imageIx: number;
  images: Image[];
  highlightHeaderProvider?: any;
  triggerImageMaxHeight?: number;
  deleteImage?: any;
  favoriteImage?: any;
  removeFromAlbum?: any;
};

type State = { imageSelectedIx: number };

class ImageHighlightModal extends React.PureComponent<Props, State> {
  state = { imageSelectedIx: 0 };

  handleKeyDown = (event: React.KeyboardEvent<any>) => {
    if (event.keyCode === ARROW_LEFT) {
      this.handleLeftClick();
    } else if (event.keyCode === ARROW_RIGHT) {
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

  renderTrigger = (handleOpen: (e: React.SyntheticEvent<any>) => void) => {
    const { initialImage, imageIx, triggerImageMaxHeight } = this.props;

    return (
      <GalleryImage
        height="100%"
        width="100%"
        style={{ maxHeight: triggerImageMaxHeight }}
        src={initialImage.preview_url}
        onClick={(e: any) => {
          this.setState({ imageSelectedIx: imageIx });
          handleOpen(e);
        }}
      />
    );
  };

  render() {
    const { imageSelectedIx } = this.state;
    const {
      images,
      highlightHeaderProvider,
      deleteImage,
      favoriteImage,
      removeFromAlbum,
    } = this.props;
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
            removeFromAlbum={removeFromAlbum}
          />
        )}
      </BaseModal>
    );
  }
}

export default ImageHighlightModal;
