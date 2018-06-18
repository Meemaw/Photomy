// @flow
import * as React from 'react';
import ImageHighlightModal from '../../ImageHighlightModal';
import Album from './Album';
import { AlbumsApi } from '../../../services';
import { setAlbum } from '../../../actions';
import { connect } from 'react-redux';
import { buildDataMap } from '../../../reducers/gallery';
import { ALL_PHOTOS_IMAGE_HEIGHT } from '../../../constants/gallerySizes';
import type { Image } from '../../../meta/types/Image';

type Props = { match: Object, setAlbum: Function };
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

  render() {
    const { images, updatedAt } = this.state;
    return <Album images={images} updatedAt={updatedAt} renderImage={this.renderImage} />;
  }
}

const mapDispatchToProps = {
  setAlbum,
};

export default connect(
  null,
  mapDispatchToProps,
)(AlbumContainer);
