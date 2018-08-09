import * as React from 'react';

import { albumsPath } from '../../constants/paths';
import withPush from '../../hocs/Router';
import { Album } from '../../meta/types/Album';
import AlbumPreview from './AlbumPreview';

type Props = { push: any; album: Album };

class AlbumPreviewContainer extends React.Component<Props, object> {
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
