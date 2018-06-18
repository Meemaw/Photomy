// @flow
import React from 'react';
import SavableTab from '../common/SavableTab';

type Props = { album: Object };
type State = { savingAlbum: boolean };

class AlbumTabContainer extends React.Component<Props, State> {
  state = { savingAlbum: false };

  setSavingAlbum = (savingAlbum: boolean) => this.setState({ savingAlbum });

  saveAlbum = (albumName: string): Promise<*> => {
    return Promise.resolve();
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
        value={album.albumName}
        saveValue={this.saveAlbum}
        defaultValue="Untitled album"
      />
    );
  }
}

export default AlbumTabContainer;
