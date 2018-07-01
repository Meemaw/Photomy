// @flow
import React from 'react';
import NewAlbum from './NewAlbum';
import withPush from '../../hocs/Router';
import { addAlbumAction, addAlbumToImage } from '../../actions';
import { AlbumsApi } from '../../services';
import { connect } from 'react-redux';
import { albumsPath } from '../../lib/paths';
import { mapAlbum, withImage } from '../../meta/types/Album';
import type { User } from '../../meta/types/User';
import type { Image } from '../../meta/types/Image';

type Props = {
  user: User,
  push: Function,
  image: Image,
  addAlbumAction: Function,
  addAlbumToImage: Function,
};
type State = { creatingAlbum: boolean };

class NewAlbumContainer extends React.Component<Props, State> {
  state = { creatingAlbum: false };

  handleClick = async () => {
    const { user, image, addAlbumAction, addAlbumToImage } = this.props;
    const userId = user.id;
    this.setState({ creatingAlbum: true });
    let album = await AlbumsApi.create({ name: '', user: userId });
    await AlbumsApi.addImage({ image_id: image.image_id, albumId: album.id });
    this.props.push(`${albumsPath}/${album.id}`);
    album = withImage(mapAlbum(album), image);
    addAlbumAction(album);
    addAlbumToImage(album, image);
  };

  render() {
    const { creatingAlbum } = this.state;
    return <NewAlbum handleClick={this.handleClick} creatingAlbum={creatingAlbum} />;
  }
}

function mapStateToProps(state) {
  return { user: state.auth.user };
}

const mapDispatchToProps = {
  addAlbumAction,
  addAlbumToImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withPush(NewAlbumContainer));
