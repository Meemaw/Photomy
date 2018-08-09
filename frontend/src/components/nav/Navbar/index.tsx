import * as React from 'react';
import { connect } from 'react-redux';

import { Location } from '../../../../node_modules/@types/history';
import { RouteComponentProps } from '../../../../node_modules/@types/react-router';
import { logout, setGalleryType } from '../../../actions';
import { ISetGalleryType } from '../../../actions/ui';
import { albumsPath, galleryPath, peoplePath } from '../../../constants/paths';
import withPush from '../../../hocs/Router';
import { GalleryType } from '../../../meta/types/GalleryType';
import { StoreState } from '../../../meta/types/Store';
import { AuthApi } from '../../../services';
import Navbar from './Navbar';

interface Props extends RouteComponentProps<any> {
  setGalleryType: (galleryType: GalleryType) => ISetGalleryType;
  galleryType: string;
  logout: () => void;
  album: any;
  identity: any;
  push: any;
  user: any;
  location: Location;
}

class NavbarContainer extends React.Component<Props, object> {
  logout = () => {
    AuthApi.logout()
      .then(_ => this.props.logout())
      .catch(err => {
        // console.log(err);
      });
  };

  render() {
    const { galleryType, location, identity, push, user, album } = this.props;

    const peoplePage = location.pathname.includes(peoplePath);
    const albumPage = location.pathname.includes(albumsPath);
    const isGallery = location.pathname === galleryPath;

    return (
      <Navbar
        galleryType={galleryType}
        setGalleryType={this.props.setGalleryType}
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

function mapStateToProps(state: StoreState) {
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

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withPush(NavbarContainer));

export default connected;
