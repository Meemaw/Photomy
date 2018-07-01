// @flow
import React from 'react';
import SavableTab from '../common/SavableTab';
import { AlbumsApi } from '../../services';
import { connect } from 'react-redux';
import { renameAlbum } from '../../actions';

type Props = { album: Object, renameAlbum: Function };
type State = { savingAlbum: boolean };

class AlbumTabContainer extends React.Component<Props, State> {
  state = { savingAlbum: false };

  setSavingAlbum = (savingAlbum: boolean) => this.setState({ savingAlbum });

  saveAlbum = (albumName: string): Promise<*> => {
    const { album } = this.props;
    const name = album.albumName;

    if (albumName === name) {
      this.setState({ savingAlbum: false });
      return Promise.resolve();
    }

    const updatedAlbum = { ...album, name: albumName };
    return AlbumsApi.patch({ ...updatedAlbum, albumId: updatedAlbum.id })
      .then(resp => {
        this.props.renameAlbum(updatedAlbum);
        this.setSavingAlbum(false);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { savingAlbum } = this.state;
    const { album } = this.props;
    const loading = Object.keys(album).length === 0;
    return (
      <SavableTab
        savingValue={savingAlbum}
        setSavingValue={this.setSavingAlbum}
        loading={loading}
        value={album.name}
        saveValue={this.saveAlbum}
        defaultValue="Untitled album"
      />
    );
  }
}

const mapDispatchToProps = {
  renameAlbum,
};

export default connect(
  null,
  mapDispatchToProps,
)(AlbumTabContainer);
