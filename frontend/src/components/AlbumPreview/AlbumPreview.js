// @flow
import React from 'react';
import GalleryImage from '../Gallery/GalleryImage';
import styled from 'styled-components';
import { toReadableAlbumDate } from '../../lib/date';
import { ALBUMS_IMAGE_WIDTH } from '../../constants/gallerySizes';
import { getCoverUrl } from '../../meta/types/Album';
import type { Album } from '../../meta/types/Album';

type Props = { album: Album, onAlbumClick: Function };

const AlbumPreview = ({ onAlbumClick, album }: Props) => {
  return (
    <AlbumPreviewStyle onClick={onAlbumClick} className="AlbumPreview">
      <GalleryImage
        src={getCoverUrl(album)}
        style={{ objectFit: 'cover' }}
        width="100%"
        height={ALBUMS_IMAGE_WIDTH}
      />
      <div
        style={{
          position: 'absolute',
          fontSize: '0.8rem',
          bottom: '0px',
          color: 'white',
          padding: '4px',
          width: '100%',
          zIndex: 100,
          background: 'linear-gradient(rgba(0, 0, 0, .55), rgba(0, 0, 0, .55))',
        }}
      >
        <div style={{ color: 'white', fontWeight: 900 }}>{album.name}</div>
        <div style={{ color: 'white', fontWeight: 900 }}>
          {album.images_count} images · {toReadableAlbumDate(album.uploaded_at)}
        </div>
      </div>
    </AlbumPreviewStyle>
  );
};

const AlbumPreviewStyle = styled.div`
  position: relative;
  :hover {
    cursor: pointer;
  }
`;

export default AlbumPreview;
