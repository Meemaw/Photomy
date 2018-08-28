import * as React from 'react';
import { onlyUpdateForKeys } from 'recompose';

import { ALBUMS_IMAGE_WIDTH } from '../../../constants/gallerySizes';
import { Album } from '../../../meta/types/Album';
import Loading from '../../common/Loading';
import Gallery from '../../Gallery';

type Props = {
  albums: Album[];
  loading: boolean;
  updatedAt?: Date;
  renderImage: (image: Album) => React.ReactNode;
};

const Albums = ({ albums, loading, updatedAt, renderImage }: Props) => {
  if (loading) {
    return <Loading />;
  }

  const isEmpty = !loading && albums.length === 0;

  return (
    <Gallery isEmpty={isEmpty} emptyInstructions="Create albums to see them here">
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
