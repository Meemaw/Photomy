// @flow
import React from 'react';
import GalleryImage from '../Gallery/GalleryImage';
import styled from 'styled-components';
import { toReadableAlbumDate } from '../../lib/date';
import { getCoverUrl } from '../../meta/types/Album';
import type { Album } from '../../meta/types/Album';

type Props = { album: Album, onAlbumClick: Function };

const AlbumPreview = ({ onAlbumClick, album }: Props) => {
  return (
    <AlbumPreviewStyle onClick={onAlbumClick} className="AlbumPreview">
      <GalleryImage
        src={getCoverUrl(album)}
        height="auto"
        width="100%"
        style={{ objectFit: 'cover' }}
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
          {imageCountText(album.images_count)} · {toReadableAlbumDate(album.uploaded_at)}
        </div>
      </div>
    </AlbumPreviewStyle>
  );
};

const imageCountText = (imagesCount: number) => {
  return imagesCount === 0 ? 'No images' : imagesCount === 1 ? '1 image' : `${imagesCount} images`;
};

const AlbumPreviewStyle = styled.div`
  position: relative;
  width: 100%;
  :hover {
    cursor: pointer;
  }
`;

export default AlbumPreview;
