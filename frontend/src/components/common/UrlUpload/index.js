// @flow
import React from 'react';
import GalleryImage from '../../Gallery/GalleryImage';
import LoadingIcon from '../../common/LoadingIcon';
import { Button, Form, Card, Icon, Message } from 'semantic-ui-react';
import { URL_UPLAD_IMAGE_PREVIEW_HEIGHT } from '../../../constants/gallerySizes';

type Props = { uploadPhoto: string => Promise<*> };
type State = {
  url: string,
  error: ?string,
  preview: boolean,
  uploading: boolean,
  successMessage: ?string,
};

class UrlUpload extends React.Component<Props, State> {
  state = { url: '', error: null, preview: false, uploading: false, successMessage: null };

  handleChange = (_: any, { value }: Object) => {
    this.setState({ url: value, error: null, preview: false, successMessage: null });
  };

  handleUpload = () => {
    const { url, uploading } = this.state;

    if (url && !uploading) {
      this.setState({ uploading: true, successMessage: null, error: null });
      this.props
        .uploadPhoto(url)
        .then(resp => {
          this.setState({
            error: null,
            uploading: false,
            successMessage: 'Image successfuly uploaded!',
          });
        })
        .catch(err => {
          this.setState({
            error: 'Link does not contain any image!',
            uploading: false,
            successMessage: null,
          });
        });
    } else if (!url) {
      this.setState({ error: '', preview: false, successMessage: null });
    }
  };

  renderIcon = () => {
    const { uploading, successMessage } = this.state;

    return successMessage ? (
      <Icon name="checkmark" color="green" size="big" style={iconStyle} />
    ) : uploading ? (
      <LoadingIcon style={iconStyle} color="yellow" size="big" />
    ) : null;
  };

  openPreview = () => this.setState({ preview: true });

  render() {
    const { url, error, preview, uploading, successMessage } = this.state;
    const hasError = error !== null;
    const hasSuccessMessage = successMessage !== null;

    return (
      <Form>
        <Form.Input error={hasError} label="Image link" value={url} onChange={this.handleChange} />

        <Button.Group>
          <Button color="blue" icon="image" content="Preview" onClick={this.openPreview} />
          <Button.Or />
          <Button
            color="green"
            icon="upload"
            content="Upload"
            onClick={this.handleUpload}
            loading={uploading}
          />
        </Button.Group>
        {hasSuccessMessage && <Message positive content={successMessage} />}
        {hasError && <Message negative content={error} />}

        {preview && (
          <Card style={{ width: '100%', background: 'black' }}>
            <GalleryImage
              src={url}
              width="100%"
              height="100%"
              style={{ maxHeight: URL_UPLAD_IMAGE_PREVIEW_HEIGHT }}
            />
            {this.renderIcon()}
          </Card>
        )}
      </Form>
    );
  }
}

const iconStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
};

export default UrlUpload;
