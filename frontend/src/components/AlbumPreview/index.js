// @flow
import React from 'react';
import withPush from '../../hocs/Router';
import AlbumPreview from './AlbumPreview';
import { albumsPath } from '../../lib/paths';
import type { Album } from '../../meta/types/Album';

type Props = { push: Function, album: Album };
type State = {};

class AlbumPreviewContainer extends React.Component<Props, State> {
  onAlbumClick = () => {
    const { album } = this.props;
    this.props.push(`${albumsPath}/${album.id}`);
  };

  render() {
    const { album } = this.props;
    return <AlbumPreview onAlbumClick={this.onAlbumClick} album={album} />;
  }
}

export default withPush(AlbumPreviewContainer);
