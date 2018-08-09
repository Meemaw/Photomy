import * as React from 'react';
import { onlyUpdateForKeys } from 'recompose';
import { Divider } from 'semantic-ui-react';
import styled from 'styled-components';

import { SpanClick } from '../../../meta/types/Function';
import { Image, ImageMap } from '../../../meta/types/Image';
import ActionableSpan from '../../common/ActionableSpan';
import Gallery from '../../Gallery';

type Props = {
  images: Image[];
  updatedAt?: Date;
  renderImage: (image: Image, dataMap: ImageMap) => React.ReactNode;
  albumDeleting: boolean;
  handleDelete: SpanClick;
};

const Album = ({ images, updatedAt, renderImage, albumDeleting, handleDelete }: Props) => {
  return (
    <Gallery renderAddPhoto={false} isEmpty={false}>
      <Gallery.Section images={images} sectionHeader="Photos" renderImage={renderImage} />
      <Gallery.FooterInfo
        count={images.length}
        updatedAt={updatedAt}
        ofWhat="Photos"
        inWhat="album"
      />
      <Divider />
      <GalleryFootnote>
        <ActionableSpan
          fontWeight={500}
          content="Delete album"
          actionLoading={albumDeleting}
          handleClick={handleDelete}
        />
      </GalleryFootnote>
      <Divider />
    </Gallery>
  );
};

const GalleryFootnote = styled.div`
  text-align: center;
`;

export default onlyUpdateForKeys(['images', 'updatedAt', 'albumDeleting'])(Album);
