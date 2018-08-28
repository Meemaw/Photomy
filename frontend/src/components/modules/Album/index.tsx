import * as React from 'react';
import { connect } from 'react-redux';

import { deleteAlbum, removeImageFromAlbum, setAlbum } from '../../../actions';
import { ALL_PHOTOS_IMAGE_HEIGHT } from '../../../constants/gallerySizes';
import { galleryPath } from '../../../constants/paths';
import withPush from '../../../hocs/Router';
import { Image, mapImages } from '../../../meta/types/Image';
import { StoreState } from '../../../meta/types/Store';
import { buildDataMap } from '../../../reducers/gallery/util';
import { AlbumsApi } from '../../../services';
import ImageHighlightModal from '../../ImageHighlightModal';
import Album from './Album';

type Props = {
  match: any;
  setAlbum: any;
  albumDeleting: boolean;
  deleteAlbum: any;
  push: any;
  removeImageFromAlbum: any;
};

type State = {
  images: Image[];
  updatedAt: Date;
  name: string;
};

const UNTITLED_ALBUM = 'Untitled album';

class AlbumContainer extends React.Component<Props, State> {
  state = { images: [], updatedAt: new Date(), name: '' };
  dataMap = {};

  async componentDidMount() {
    const { album_id } = this.props.match.params;
    const data = await AlbumsApi.getAlbum({ album_id });
    const images = mapImages(data.images);
    this.dataMap = buildDataMap(images);
    this.props.setAlbum({ id: data.id, name: data.name });
    this.setState({ images, updatedAt: new Date(), name: data.name });
  }

  removeFromAlbum = (imageId: string) => {
    const { album_id } = this.props.match.params;
    const { images } = this.state;
    const updatedImages = images.filter((image: Image) => image.image_id !== imageId);
    this.dataMap = buildDataMap(updatedImages);
    this.setState({ images: updatedImages });
    this.props.removeImageFromAlbum(imageId, album_id);
  };

  renderImage = (image: Image): React.ReactNode => {
    const imageIx = this.dataMap[image.image_id].ix;

    return (
      <ImageHighlightModal
        imageIx={imageIx}
        triggerImageMaxHeight={ALL_PHOTOS_IMAGE_HEIGHT}
        highlightHeaderProvider={() => this.state.name || UNTITLED_ALBUM}
        images={Object.values(this.dataMap)}
        initialImage={image}
        removeFromAlbum={this.removeFromAlbum}
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
  removeImageFromAlbum,
};

function mapStateToProps(state: StoreState) {
  return { albumDeleting: state.album.albumDeleting };
}

const WithPush = withPush(AlbumContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithPush);
