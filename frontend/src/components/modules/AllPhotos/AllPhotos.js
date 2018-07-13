// @flow
import * as React from 'react';
import Gallery from '../../Gallery';
import { FooterStyle } from '../../Gallery/FooterInfo';
import ImageHighlightModal from '../../ImageHighlightModal';
import LoadingIcon from '../../common/LoadingIcon';
import type { Image } from '../../../meta/types/Image';
import ClickableSpan from '../../common/ClickableSpan';
import { Visibility, Icon } from 'semantic-ui-react';
import { ALL_PHOTOS_IMAGE_HEIGHT } from '../../../constants/gallerySizes';

type Props = {
  count: number,
  updatedAt: ?Date,
  images: Object,
  dataMap: Object,
  deleteImage: Function,
  favoriteImage: Function,
  isEmpty: boolean,
  loadMore: Function,
  fetchingImages: boolean,
  hasMore: boolean,
};

type State = {
  stickySection: ?string,
};

class AllPhotos extends React.PureComponent<Props, State> {
  state = { stickySection: null };

  stickyCalculations = {};
  contextRef: ?HTMLDivElement = null;

  renderImage = (image: Image): React.Node => {
    const imageIx = this.props.dataMap[image.image_id].ix;

    return (
      <ImageHighlightModal
        imageIx={imageIx}
        images={Object.values(this.props.dataMap)}
        initialImage={image}
        deleteImage={this.props.deleteImage}
        favoriteImage={this.props.favoriteImage}
      />
    );
  };

  handleContextRef = (contextRef: HTMLDivElement) => (this.contextRef = contextRef);

  scrollToBottom = () => {
    const ref = this.contextRef;
    if (ref) {
      setTimeout(() => (ref.scrollTop = ref.scrollHeight), 0);
    }
  };

  handleUpdate = (e: SyntheticEvent<>, { calculations }: Object, section: string) => {
    const { percentagePassed, height, offScreen, onScreen, topPassed } = calculations;
    const currentTop = percentagePassed * height;

    if (currentTop + 80 >= height || offScreen || (onScreen && percentagePassed === 0)) {
      delete this.stickyCalculations[section];
    } else if (topPassed) {
      this.stickyCalculations[section] = true;
    }

    const stickySection = Object.keys(this.stickyCalculations)[0];

    this.setState({ stickySection });
  };

  render() {
    const {
      count,
      updatedAt,
      images,
      dataMap,
      isEmpty,
      loadMore,
      fetchingImages,
      hasMore,
    } = this.props;
    const { stickySection } = this.state;

    return (
      <Gallery
        handleContextRef={this.handleContextRef}
        isEmpty={isEmpty}
        galleryName="photos"
        loadMore={loadMore}
      >
        {Object.keys(images).map(section => (
          <Visibility
            continuous={false}
            key={section}
            context={this.contextRef}
            onUpdate={(e, data) => this.handleUpdate(e, data, section)}
            className="VisibilityWrapper"
          >
            <Gallery.Section
              renderImage={this.renderImage}
              sectionHeader={section}
              images={images[section]}
              isSticky={stickySection === section}
              dataMap={dataMap}
              minImageWidth={ALL_PHOTOS_IMAGE_HEIGHT}
              id={`Section-${section}`}
            />
          </Visibility>
        ))}

        {!fetchingImages ? (
          <React.Fragment>
            <FooterStyle padding="0px">
              {hasMore && (
                <ClickableSpan onClick={loadMore}>
                  <Icon name="refresh" /> Load More
                </ClickableSpan>
              )}
            </FooterStyle>
            <Gallery.FooterInfo count={count} updatedAt={updatedAt} loadMore={loadMore} />
          </React.Fragment>
        ) : updatedAt !== null ? (
          <FooterStyle>
            <LoadingIcon />
          </FooterStyle>
        ) : null}
      </Gallery>
    );
  }
}

export default AllPhotos;
