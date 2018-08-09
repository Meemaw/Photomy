// @flow
import { debounce } from 'lodash';
import * as React from 'react';
import Waypoint from 'react-waypoint';

import AddImages from '../AddImages';
import ContentContainer from '../common/ContentContainer';
import WaypointEl from '../common/WaypointEl';
import EmptyGallery from './EmptyGallery';
import FooterInfo from './FooterInfo';
import GalleryImage from './GalleryImage';
import GallerySection from './GallerySection';

type Props = {
  renderAddPhoto?: boolean;
  handleContextRef?: any;
  children: any;
  isEmpty: boolean;
  loadMore?: any;
  galleryName?: string;
  emptyInstructions?: string;
};

class Gallery extends React.Component<Props, object> {
  static Section = GallerySection;
  static Image = GalleryImage;
  static FooterInfo = FooterInfo;
  static Empty = EmptyGallery;
  static defaultProps = {
    renderAddPhoto: true,
    loadMore: null,
  };

  contextRef = null;

  handleContextRef = (contextRef: any) => {
    this.contextRef = contextRef;
    if (this.props.handleContextRef) {
      this.props.handleContextRef(contextRef);
    }
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

  handlePositionChange = ({ previousPosition, currentPosition }: any) => {
    if (previousPosition === undefined) {
      return;
    }
    if (currentPosition === 'inside' || currentPosition === 'above') {
      this.loadMore();
    }
  };

  render() {
    const { renderAddPhoto, isEmpty, children, emptyInstructions, loadMore } = this.props;

    return (
      <ContentContainer className="ImageGalleryContainer" innerRef={this.handleContextRef}>
        {isEmpty ? <EmptyGallery instructions={emptyInstructions} /> : children}
        {renderAddPhoto && <AddImages />}

        {loadMore &&
          this.contextRef && (
            <Waypoint
              onPositionChange={this.handlePositionChange}
              scrollableAncestor={this.contextRef}
            >
              <WaypointEl />
            </Waypoint>
          )}
      </ContentContainer>
    );
  }
}

export default Gallery;
