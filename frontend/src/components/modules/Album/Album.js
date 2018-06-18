// @flow
import React from 'react';
import Gallery from '../../Gallery';
import ClickableSpan from '../../common/ClickableSpan';
import styled from 'styled-components';
import { onlyUpdateForKeys } from 'recompose';
import { Divider } from 'semantic-ui-react';
import type { Image } from '../../../meta/types/Image';

type Props = { images: Array<Image>, updatedAt: ?Date, renderImage: Function };

const Album = ({ images, updatedAt, renderImage }: Props) => {
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
        <ClickableSpan fontWeight={500}>Delete album</ClickableSpan>
      </GalleryFootnote>
      <Divider />
    </Gallery>
  );
};

const GalleryFootnote = styled.div`
  text-align: center;
`;

export default onlyUpdateForKeys(['images', 'updatedAt'])(Album);
