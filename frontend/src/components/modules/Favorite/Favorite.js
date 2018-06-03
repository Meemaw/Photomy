// @flow
import React from 'react';
import Gallery from '../../Gallery';
import type { Image } from '../../../meta/types/Image';

type Props = {
  images: Array<Image>,
  count: number,
  updatedAt: Date,
  dataMap: Object,
  isEmpty: boolean,
};
type State = {};

class Favorite extends React.Component<Props, State> {
  render() {
    const { images, count, updatedAt, dataMap, isEmpty } = this.props;
    return (
      <Gallery renderAddPhoto={false} isEmpty={isEmpty} galleryName="favorite">
        <Gallery.Section
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
