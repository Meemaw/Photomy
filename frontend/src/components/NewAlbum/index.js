// @flow
import React, { Component } from 'react';
import NewAlbum from './NewAlbum';
import withPush from '../../hocs/Router';
import { AlbumsApi } from '../../services';
import { connect } from 'react-redux';
import { albumsPath } from '../../lib/paths';
import type { User } from '../../meta/types/User';
import type { Image } from '../../meta/types/Image';

type Props = { user: User, push: Function, image: Image };
type State = { creatingAlbum: boolean };

class NewAlbumContainer extends Component<Props, State> {
  state = { creatingAlbum: false };

  handleClick = async () => {
    const { user, image } = this.props;
    const userId = user.id;
    this.setState({ creatingAlbum: true });
    const album = await AlbumsApi.create({ name: '', user: userId });

    await AlbumsApi.addImage({ image_id: image.image_id, albumId: album.id });

    this.props.push(`${albumsPath}/${album.id}`);
  };

  render() {
    const { creatingAlbum } = this.state;
    return <NewAlbum handleClick={this.handleClick} creatingAlbum={creatingAlbum} />;
  }
}

function mapStateToProps(state) {
  return { user: state.auth.user };
}

export default connect(
  mapStateToProps,
  null,
)(withPush(NewAlbumContainer));
