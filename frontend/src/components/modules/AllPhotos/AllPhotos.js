// @flow
import * as React from 'react';
import Gallery from '../../Gallery';
import ImageHighlightModal from '../../ImageHighlightModal';
import type { Image } from '../../../meta/types/Image';
import { Visibility } from 'semantic-ui-react';
import { ALL_PHOTOS_IMAGE_HEIGHT } from '../../../constants/gallerySizes';

type Props = {
  count: number,
  updatedAt: ?Date,
  images: Object,
  dataMap: Object,
  deleteImage: Function,
  favoriteImage: Function,
  isEmpty: boolean,
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
    const { count, updatedAt, images, dataMap, isEmpty } = this.props;
    const { stickySection } = this.state;

    return (
      <Gallery handleContextRef={this.handleContextRef} isEmpty={isEmpty} galleryName="photos">
        {Object.keys(images).map(section => (
          <Visibility
            continuous={false}
            key={section}
            context={this.contextRef}
            onUpdate={(e, data) => this.handleUpdate(e, data, section)}
          >
            <Gallery.Section
              renderImage={this.renderImage}
              sectionHeader={section}
              images={images[section]}
              isSticky={stickySection === section}
              dataMap={dataMap}
              minImageWidth={ALL_PHOTOS_IMAGE_HEIGHT}
            />
          </Visibility>
        ))}

        <Gallery.FooterInfo count={count} updatedAt={updatedAt} />
      </Gallery>
    );
  }
}

export default AllPhotos;
