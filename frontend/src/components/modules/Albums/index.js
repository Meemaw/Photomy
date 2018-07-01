// @flow
import React from 'react';
import Albums from './Albums';
import AlbumPreview from '../../AlbumPreview';
import { fetchAlbums } from '../../../actions';
import { connect } from 'react-redux';
import type { Album } from '../../../meta/types/Album';
import type { AlbumsState } from '../../../meta/types/AlbumsState';

type Props = { albumsState: AlbumsState, fetchAlbums: Function };
type State = {};

class AlbumsContainer extends React.Component<Props, State> {
  componentDidMount() {
    const {
      albumsState: { albumsFetched },
    } = this.props;

    if (!albumsFetched) {
      this.props.fetchAlbums();
    }
  }

  renderAlbum = (album: Album) => {
    return <AlbumPreview key={album.id} album={album} />;
  };

  render() {
    const { albumsState } = this.props;
    const { albums, albumsFetching, updatedAt } = albumsState;
    return (
      <Albums
        albums={albums}
        loading={albumsFetching}
        updatedAt={updatedAt}
        renderImage={this.renderAlbum}
      />
    );
  }
}

function mapStateToProps(state) {
  return { albumsState: state.albums };
}

const mapDispatchToProps = {
  fetchAlbums,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumsContainer);
