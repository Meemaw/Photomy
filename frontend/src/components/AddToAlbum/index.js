// @flow
import * as React from 'react';
import AddToAlbum from './AddToAlbum';
import withPush from '../../hocs/Router';
import { AlbumsApi } from '../../services';
import { fetchAlbums, addAlbumToImage } from '../../actions';
import { connect } from 'react-redux';
import type { AlbumsState } from '../../meta/types/AlbumsState';
import type { Image } from '../../meta/types/Image';
import type { Album } from '../../meta/types/Album';

import { albumsPath } from '../../lib/paths';

type Props = {
  albumsState: AlbumsState,
  handleClose: Function,
  fetchAlbums: Function,
  image: Image,
  push: Function,
  addAlbumToImage: Function,
};
type State = {};

class AddToAlbumContainer extends React.Component<Props, State> {
  componentDidMount() {
    const {
      albumsState: { albumsFetched },
    } = this.props;

    if (!albumsFetched) {
      this.props.fetchAlbums();
    }
  }

  addToAlbum = async (album: Album) => {
    const { image, push } = this.props;
    await AlbumsApi.addImage({ image_id: image.image_id, albumId: album.id });
    push(`${albumsPath}/${album.id}`);
    this.props.addAlbumToImage(album, image);
  };

  render() {
    const { handleClose, albumsState, image } = this.props;
    return (
      <AddToAlbum
        handleClose={handleClose}
        albumsState={albumsState}
        image={image}
        addToAlbum={this.addToAlbum}
      />
    );
  }
}

function mapStateToProps(state) {
  return { albumsState: state.albums };
}

const mapDispatchToProps = {
  fetchAlbums,
  addAlbumToImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withPush(AddToAlbumContainer));
