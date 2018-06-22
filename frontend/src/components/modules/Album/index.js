// @flow
import * as React from 'react';
import ImageHighlightModal from '../../ImageHighlightModal';
import Album from './Album';
import withPush from '../../../hocs/Router';
import { galleryPath } from '../../../lib/paths';
import { AlbumsApi } from '../../../services';
import { setAlbum, deleteAlbum } from '../../../actions';
import { connect } from 'react-redux';
import { buildDataMap } from '../../../reducers/gallery/util';
import { ALL_PHOTOS_IMAGE_HEIGHT } from '../../../constants/gallerySizes';
import type { Image } from '../../../meta/types/Image';

type Props = {
  match: Object,
  setAlbum: Function,
  albumDeleting: boolean,
  deleteAlbum: Function,
  push: Function,
};
type State = { images: Array<Image>, updatedAt: ?Date, name?: string };

const UNTITLED_ALBUM = 'Untitled album';

class AlbumContainer extends React.Component<Props, State> {
  state = { images: [], updatedAt: null };
  dataMap = {};

  async componentDidMount() {
    const { album_id } = this.props.match.params;

    const data = await AlbumsApi.getAlbum({ album_id });

    const images = data.images.map(image => ({
      ...image,
      uploaded_at: new Date(image.uploaded_at),
    }));

    this.dataMap = buildDataMap(images);

    this.props.setAlbum({ albumId: data.id, albumName: data.name });
    this.setState({ images, updatedAt: new Date(), name: data.name });
  }

  renderImage = (image: Image): React.Node => {
    const imageIx = this.dataMap[image.image_id].ix;

    return (
      <ImageHighlightModal
        imageIx={imageIx}
        triggerImageMaxHeight={ALL_PHOTOS_IMAGE_HEIGHT}
        highlightHeaderProvider={() => this.state.name || UNTITLED_ALBUM}
        images={Object.values(this.dataMap)}
        initialImage={image}
      />
    );
  };

  handleDelete = async () => {
    const { album_id } = this.props.match.params;
    await this.props.deleteAlbum(album_id);
    this.props.push(galleryPath);
  };

  render() {
    const { images, updatedAt } = this.state;
    const { albumDeleting } = this.props;
    return (
      <Album
        images={images}
        updatedAt={updatedAt}
        renderImage={this.renderImage}
        albumDeleting={albumDeleting}
        handleDelete={this.handleDelete}
      />
    );
  }
}

const mapDispatchToProps = {
  setAlbum,
  deleteAlbum,
};

function mapStateToProps(state) {
  return { albumDeleting: state.album.albumDeleting };
}

const WithPush = withPush(AlbumContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithPush);
