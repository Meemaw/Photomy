// @flow
import React from 'react';
import Navbar from './Navbar';
import withPush from '../../../hocs/Router';
import { connect } from 'react-redux';
import { setGalleryType, logout } from '../../../actions';
import { AuthApi } from '../../../services';
import { peoplePath, rootPath } from '../../../lib/paths';
import type { User } from '../../../meta/types/User';

function mapStateToProps(state) {
  return { galleryType: state.ui.galleryType, identity: state.identity, user: state.auth.user };
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
  identity: Object,
  push: Function,
  user: User,
};

type State = {};

class NavbarContainer extends React.Component<Props, State> {
  logout = () => {
    AuthApi.logout()
      .then(resp => {
        localStorage.clear();
        this.props.logout();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { galleryType, setGalleryType, location, identity, push, user } = this.props;

    const peoplePage = location.pathname.includes(peoplePath);
    const isGallery = location.pathname === rootPath;

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
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withPush(NavbarContainer));
