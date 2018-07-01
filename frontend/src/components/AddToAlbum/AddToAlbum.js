// @flow
import * as React from 'react';
import AlbumsList from '../AlbumsList';
import LoadingIcon from '../common/LoadingIcon';
import ClosableSegmentHeader from '../common/ClosableSegmentHeader';
import NewAlbum from '../NewAlbum';
import type { AlbumsState } from '../../meta/types/AlbumsState';
import type { Image } from '../../meta/types/Image';

type Props = {
  albumsState: AlbumsState,
  handleClose: Function,
  image: Image,
  addToAlbum: Function,
};

const AddToAlbum = ({ handleClose, albumsState, image, addToAlbum }: Props) => {
  return (
    <React.Fragment>
      <ClosableSegmentHeader handleClose={handleClose} header="Add to album" />
      <NewAlbum image={image} />
      {albumsState.albumsFetching ? (
        <LoadingIcon />
      ) : (
        <AlbumsList albums={albumsState.albums} handleClick={addToAlbum} />
      )}
    </React.Fragment>
  );
};

export default AddToAlbum;
