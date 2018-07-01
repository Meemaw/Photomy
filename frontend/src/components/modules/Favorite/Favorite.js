// @flow
import * as React from 'react';
import Gallery from '../../Gallery';
import type { Image } from '../../../meta/types/Image';
import ImageHighlightModal from '../../ImageHighlightModal';

type Props = {
  images: Array<Image>,
  count: number,
  updatedAt: Date,
  dataMap: Object,
  isEmpty: boolean,
  favoriteImage: Function,
  deleteImage: Function,
};
type State = {};

class Favorite extends React.Component<Props, State> {
  renderImage = (image: Image): React.Node => {
    const imageIx = this.props.dataMap[image.image_id].ix;
    const images: Array<Image> = Object.values(this.props.dataMap);

    return (
      <ImageHighlightModal
        imageIx={imageIx}
        images={images}
        initialImage={image}
        deleteImage={this.props.deleteImage}
        favoriteImage={this.props.favoriteImage}
      />
    );
  };

  render() {
    const { images, count, updatedAt, dataMap, isEmpty } = this.props;
    return (
      <Gallery
        renderAddPhoto={false}
        isEmpty={isEmpty}
        galleryName="favorite"
        emptyInstructions="Favorite some photos in your gallery"
      >
        <Gallery.Section
          renderImage={this.renderImage}
          sectionHeader="Favorite images"
          images={images}
          isSticky={false}
          dataMap={dataMap}
        />
        <Gallery.FooterInfo count={count} updatedAt={updatedAt} ofWhat="favorite images" />
      </Gallery>
    );
  }
}

export default Favorite;
