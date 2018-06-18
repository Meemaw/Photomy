// @flow

import React from 'react';
import Loading from '../../common/Loading';
import Gallery from '../../Gallery';
import { onlyUpdateForKeys } from 'recompose';
import { ALBUMS_IMAGE_WIDTH } from '../../../constants/gallerySizes';
import type { Album } from '../../../meta/types/Album';

type Props = { albums: Array<Album>, loading: boolean, updatedAt: ?Date, renderImage: Function };

const Albums = ({ albums, loading, updatedAt, renderImage }: Props) => {
  if (loading) return <Loading />;

  return (
    <Gallery isEmpty={false}>
      <Gallery.Section
        images={albums}
        sectionHeader="Albums"
        renderImage={renderImage}
        minImageWidth={ALBUMS_IMAGE_WIDTH}
      />
      <Gallery.FooterInfo count={albums.length} updatedAt={updatedAt} ofWhat="Albums" />
    </Gallery>
  );
};

export default onlyUpdateForKeys(['albums', 'loading', 'updatedAt'])(Albums);
