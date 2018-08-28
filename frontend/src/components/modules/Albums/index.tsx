import * as React from 'react';
import { connect } from 'react-redux';

import { fetchAlbums } from '../../../actions';
import { Album } from '../../../meta/types/Album';
import { AlbumsState, StoreState } from '../../../meta/types/Store';
import AlbumPreview from '../../AlbumPreview';
import Albums from './Albums';

type Props = { albumsState: AlbumsState; fetchAlbums: any };

class AlbumsContainer extends React.Component<Props, object> {
  componentDidMount() {
    const {
      albumsState: { albumsFetched },
    } = this.props;

    if (!albumsFetched) {
      this.props.fetchAlbums();
    }
  }

  renderAlbum = (album: Album): React.ReactNode => {
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

function mapStateToProps(state: StoreState) {
  return { albumsState: state.albums };
}

const mapDispatchToProps = {
  fetchAlbums,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumsContainer);
