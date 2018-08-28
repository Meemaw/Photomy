import * as React from 'react';
import { connect } from 'react-redux';

import { addAlbum, addAlbumToImage } from '../../actions';
import { albumsPath } from '../../constants/paths';
import withPush from '../../hocs/Router';
import { mapAlbum, withImage } from '../../meta/types/Album';
import { Image } from '../../meta/types/Image';
import { StoreState } from '../../meta/types/Store';
import { AlbumsApi } from '../../services';
import NewAlbum from './NewAlbum';

type Props = {
  user: any;
  push: any;
  image: Image;
  addAlbum: any;
  addAlbumToImage: any;
};
type State = { creatingAlbum: boolean };

class NewAlbumContainer extends React.Component<Props, State> {
  state = { creatingAlbum: false };

  handleClick = async () => {
    const { user, image } = this.props;
    const userId = user.id;
    this.setState({ creatingAlbum: true });
    let album = await AlbumsApi.create({ name: '', user: userId });
    await AlbumsApi.addImage({ image_id: image.image_id, albumId: album.id });
    this.props.push(`${albumsPath}/${album.id}`);
    album = withImage(mapAlbum(album), image);
    this.props.addAlbum(album);
    this.props.addAlbumToImage(album, image);
  };

  render() {
    const { creatingAlbum } = this.state;
    return <NewAlbum handleClick={this.handleClick} creatingAlbum={creatingAlbum} />;
  }
}

function mapStateToProps(state: StoreState) {
  return { user: state.auth.user };
}

const mapDispatchToProps = {
  addAlbum,
  addAlbumToImage,
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewAlbumContainer);

export default withPush(connected);
