import * as React from 'react';
import { connect } from 'react-redux';

import { addAlbumToImage, fetchAlbums } from '../../actions';
import { AddAlbumToImage, FetchAlbums } from '../../actions/albums';
import { albumsPath } from '../../constants/paths';
import withPush, { Push } from '../../hocs/Router';
import { Album } from '../../meta/types/Album';
import { HandleClose } from '../../meta/types/Function';
import { Image } from '../../meta/types/Image';
import { AlbumsState, StoreState } from '../../meta/types/Store';
import { AlbumsApi } from '../../services';
import AddToAlbum from './AddToAlbum';

type Props = {
  albumsState: AlbumsState;
  handleClose: HandleClose;
  fetchAlbums: FetchAlbums;
  image: Image;
  push: Push;
  addAlbumToImage: AddAlbumToImage;
};

class AddToAlbumContainer extends React.Component<Props, object> {
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
    const resp = await AlbumsApi.addImage({
      image_id: image.image_id,
      albumId: album.id,
    });
    push(`${albumsPath}/${album.id}`);
    if (resp.image_added) {
      this.props.addAlbumToImage(album, image);
    }
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

function mapStateToProps(state: StoreState) {
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
