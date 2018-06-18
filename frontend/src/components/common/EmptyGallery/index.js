// @flow
import * as React from 'react';
import { Icon, Container, Divider } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Loading from '../../common/Loading';
import withUploading from '../../../hocs/WithUploading';
import { ImagesApi } from '../../../services';
import { ALL_PHOTOS_GALLERY } from '../../../constants/galleryTypes';

type Props = {
  instructions: string,
  uploadImages: Function,
  setGalleryType: Function,
};
type State = { uploading: boolean };

class EmptyGallery extends React.Component<Props, State> {
  state = { uploading: false };

  static defaultProps = {
    instructions: 'Drag some photos to your gallery',
  };

  handleDrop = (accepted: Array<any>, rejected: Array<any>) => {
    this.handleUpload(accepted);
  };

  uploadFile = async (file: File): Promise<*> => {
    const formData = new FormData();
    formData.append('file', file);
    const resp = await ImagesApi.upload_image_file(formData, true);
    const image = { ...resp, uploaded_at: new Date(resp.uploaded_at) };
    this.props.uploadImages([image]);
    return image;
  };

  handleUpload = async (acceptedFiles: Array<File>) => {
    const { uploading } = this.state;
    if (uploading) return;

    this.setState({ uploading: true });

    const [first, ...rest] = acceptedFiles;
    await this.uploadFile(first);
    this.props.setGalleryType(ALL_PHOTOS_GALLERY);
    await Promise.all(rest.map(file => this.uploadFile(file)));
  };

  render() {
    const { instructions } = this.props;
    const { uploading } = this.state;
    return uploading ? (
      <Loading content="Uploading images!" />
    ) : (
      <Dropzone
        accept="image/jpeg, image/png, image/ico"
        disabled={false}
        onDrop={this.handleDrop}
        className="Dropzone"
        style={{ width: '100%', height: '100%' }}
        disableClick={true}
      >
        <Divider style={{ marginTop: '0px', paddingTop: '0px' }} />
        <Container
          style={{
            height: 'calc(70%)',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            flexDirection: 'column',
          }}
        >
          <Icon name="frown" size="huge" style={{ marginBottom: '15px', width: '100%' }} />
          <div style={{ fontWeight: '600', marginBottom: '10px' }}>Ouuugh... it's empty there</div>
          <div style={{ color: '#aaa' }}>{instructions}</div>
        </Container>
      </Dropzone>
    );
  }
}

export default withUploading(EmptyGallery);
