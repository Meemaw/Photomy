import * as React from 'react';
import { Image, ImageMap } from '../../../meta/types/Image';
import Gallery from '../../Gallery';
import ImageHighlightModal from '../../ImageHighlightModal';

type Props = {
  images: Image[];
  count: number;
  updatedAt: Date;
  dataMap: ImageMap;
  isEmpty: boolean;
  favoriteImage: any;
  deleteImage: any;
};

class Favorite extends React.Component<Props, object> {
  renderImage = (image: Image): React.ReactNode => {
    const imageIx = this.props.dataMap[image.image_id].ix;
    const images: Image[] = Object.values(this.props.dataMap);

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
