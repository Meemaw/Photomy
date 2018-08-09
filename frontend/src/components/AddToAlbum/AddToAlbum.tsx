import * as React from 'react';

import { Album } from '../../meta/types/Album';
import { HandleClose } from '../../meta/types/Function';
import { Image } from '../../meta/types/Image';
import { AlbumsState } from '../../meta/types/Store';
import AlbumsList from '../AlbumsList';
import ClosableSegmentHeader from '../common/ClosableSegmentHeader';
import LoadingIcon from '../common/LoadingIcon';
import NewAlbum from '../NewAlbum';

type Props = {
  albumsState: AlbumsState;
  handleClose: HandleClose;
  image: Image;
  addToAlbum: (album: Album) => void;
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
