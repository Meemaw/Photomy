// @flow
import React from 'react';
import Navbar from './Navbar';
import withPush from '../../../hocs/Router';
import { connect } from 'react-redux';
import { setGalleryType, logout } from '../../../actions';
import { AuthApi } from '../../../services';
import { peoplePath, galleryPath, albumsPath } from '../../../lib/paths';
import type { User } from '../../../meta/types/User';

function mapStateToProps(state) {
  return {
    galleryType: state.ui.galleryType,
    identity: state.identity,
    user: state.auth.user,
    album: state.album.album,
  };
}

const mapDispatchToProps = {
  setGalleryType,
  logout,
};

type Props = {
  setGalleryType: string => Object,
  galleryType: string,
  logout: void => void,
  location: Object,
  album: Object,
  identity: Object,
  push: Function,
  user: User,
};

type State = {};

class NavbarContainer extends React.Component<Props, State> {
  logout = () => {
    AuthApi.logout()
      .then(resp => this.props.logout())
      .catch(err => console.log(err));
  };

  render() {
    const { galleryType, setGalleryType, location, identity, push, user, album } = this.props;

    const peoplePage = location.pathname.includes(peoplePath);
    const albumPage = location.pathname.includes(albumsPath);
    const isGallery = location.pathname === galleryPath;

    return (
      <Navbar
        galleryType={galleryType}
        setGalleryType={setGalleryType}
        logout={this.logout}
        peoplePage={peoplePage}
        isGallery={isGallery}
        user={user}
        identity={identity}
        setMenu={push}
        pathname={location.pathname}
        albumPage={albumPage}
        album={album}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withPush(NavbarContainer));
