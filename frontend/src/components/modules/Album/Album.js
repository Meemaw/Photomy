// @flow
import React from 'react';
import Gallery from '../../Gallery';
import styled from 'styled-components';
import ActionableSpan from '../../common/ActionableSpan';
import { onlyUpdateForKeys } from 'recompose';
import { Divider } from 'semantic-ui-react';
import type { Image } from '../../../meta/types/Image';

type Props = {
  images: Array<Image>,
  updatedAt: ?Date,
  renderImage: Function,
  albumDeleting: boolean,
  handleDelete: Function,
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
