// @flow
import React from 'react';
import Albums from './Albums';
import AlbumPreview from '../../AlbumPreview';
import { AlbumsApi } from '../../../services';
import type { Album } from '../../../meta/types/Album';

type Props = {};
type State = { albums: Array<Album>, loading: boolean, updatedAt: ?Date };

class AlbumsContainer extends React.Component<Props, State> {
  state = { albums: [], loading: true, updatedAt: null };

  async componentDidMount() {
    const albums = await AlbumsApi.list();

    const fixedAlbums = albums.map(album => {
      const images = album.images.map(image => ({
        ...image,
        uploaded_at: new Date(image.uploaded_at),
      }));
      const name = album.name || 'Untitled album';

      return { ...album, uploaded_at: new Date(album.uploaded_at), images, name };
    });

    this.setState({ albums: fixedAlbums, loading: false, updatedAt: new Date() });
  }

  renderAlbum = (album: Album) => {
    return <AlbumPreview key={album.id} album={album} />;
  };

  render() {
    const { albums, loading, updatedAt } = this.state;
    return (
      <Albums
        albums={albums}
        loading={loading}
        updatedAt={updatedAt}
        renderImage={this.renderAlbum}
      />
    );
  }
}

export default AlbumsContainer;
