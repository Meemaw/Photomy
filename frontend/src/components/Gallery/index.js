// @flow
import * as React from 'react';
import ContentContainer from '../common/ContentContainer';
import GallerySection from './GallerySection';
import GalleryImage from './GalleryImage';
import FooterInfo from './FooterInfo';
import AddPhoto from '../AddPhoto';
import Waypoint from 'react-waypoint';
import EmptyGallery from '../common/EmptyGallery';
import { debounce } from 'lodash';

type Props = {
  renderAddPhoto: boolean,
  handleContextRef?: Function,
  children: any,
  isEmpty: boolean,
  loadMore?: Function,
  galleryName?: string,
  emptyInstructions?: string,
};

type State = {};

class Gallery extends React.Component<Props, State> {
  static Section = GallerySection;
  static Image = GalleryImage;
  static FooterInfo = FooterInfo;
  contextRef = null;

  handleContextRef = (contextRef: any) => {
    this.contextRef = contextRef;
    this.props.handleContextRef && this.props.handleContextRef(contextRef);
  };

  static defaultProps = {
    renderAddPhoto: true,
    loadMore: null,
  };

  loadMore = debounce(
    () => {
      const { loadMore } = this.props;
      if (loadMore) {
        loadMore();
      }
    },
    300,
    { trailing: true },
  );

  handlePositionChange = ({ previousPosition, currentPosition, ...rest }: Object) => {
    if (previousPosition === undefined) return;

    if (currentPosition === 'inside' || currentPosition === 'above') {
      this.loadMore();
    }
  };

  render() {
    const { renderAddPhoto, isEmpty, children, emptyInstructions, loadMore } = this.props;

    return (
      <ContentContainer className="ImageGalleryContainer" innerRef={this.handleContextRef}>
        {isEmpty ? <EmptyGallery instructions={emptyInstructions} /> : children}
        {renderAddPhoto && <AddPhoto />}

        {loadMore &&
          this.contextRef && (
            <Waypoint
              onPositionChange={this.handlePositionChange}
              scrollableAncestor={this.contextRef}
            />
          )}
      </ContentContainer>
    );
  }
}

export default Gallery;
