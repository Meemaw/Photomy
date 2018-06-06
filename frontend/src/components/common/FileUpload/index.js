// @flow
import * as React from 'react';
import Dropzone from 'react-dropzone';
import GalleryImage from '../../Gallery/GalleryImage';
import styled from 'styled-components';
import type { File } from '../../../meta/types/File';
import LoadingIcon from '../../common/LoadingIcon';
import { Button, Message, Icon, Segment } from 'semantic-ui-react';

type Props = {
  disabled?: boolean,
  accept: string,
  error: ?string,
  uploadFile: File => Promise<*>,
};

type State = {
  accepted: Array<Object>,
  error: ?string,
  fileName: ?string,
  uploading: boolean,
  successMessage: ?string,
  uploaded: Array<any>,
};

// TODO robustify

class FileUpload extends React.PureComponent<Props, State> {
  state = {
    accepted: [],
    fileName: null,
    error: null,
    uploading: false,
    successMessage: null,
    uploaded: [],
  };

  static defaultProps = {
    disabled: false,
    accept: 'image/jpeg, image/png',
  };

  handleDrop = (accepted: Array<any>, rejected: Array<any>) => {
    const { accept } = this.props;

    if (accepted.length > 0) {
      const file = accepted[0];

      this.setState({
        accepted,
        uploaded: [...Array(accepted.length).keys()].map(_ => false),
        fileName: file.name,
        error: null,
        successMessage: null,
      });
    } else {
      this.setState({ error: `Supported file formats: [${accept}]`, successMessage: null });
    }
  };

  handleUpload = async (acceptedFiles: Array<File>) => {
    const { uploading } = this.state;
    if (uploading) return;

    this.setState({ uploading: true });

    await Promise.all(
      acceptedFiles.map(async (file, ix) => {
        const promise = this.props.uploadFile(file);

        promise.then(_ =>
          this.setState(prevState => ({
            uploaded: prevState.uploaded.map((upl, uplIx) => (uplIx === ix ? true : upl)),
          })),
        );
        return promise;
      }),
    );

    this.setState({ uploading: false, successMessage: 'Files successfuly uploaded!', error: null });
  };

  renderIcon = (fileIx: number) => {
    const { uploading, uploaded } = this.state;

    return uploaded[fileIx] ? (
      <Icon style={iconStyle} color="green" name="checkmark" size="large" />
    ) : uploading ? (
      <LoadingIcon style={iconStyle} color="yellow" size="large" />
    ) : null;
  };

  render() {
    const { disabled, error, accept } = this.props;
    const { accepted, uploading, successMessage } = this.state;
    const actualError = this.state.error || error;
    const hasSuccessMessage = successMessage !== null;

    return (
      <React.Fragment>
        {hasSuccessMessage && (
          <Message content={successMessage} positive style={{ margin: '0px' }} />
        )}
        <DropzoneStyle className="FileUpload">
          <Dropzone
            disabled={disabled}
            onDrop={this.handleDrop}
            accept={accept}
            className="Dropzone"
          >
            {actualError ? (
              <p style={{ color: 'red' }}>{actualError}</p>
            ) : accepted.length > 0 ? (
              <React.Fragment>
                <div className="Accepted">
                  {accepted.map((file, fileIx) => (
                    <Segment style={{ margin: '0px' }} key={file.name}>
                      <GalleryImage src={file.preview} />
                      {this.renderIcon(fileIx)}
                    </Segment>
                  ))}
                </div>
              </React.Fragment>
            ) : (
              <Message icon size="tiny">
                <Icon name="pointing down" />
                <Message.Content>
                  <Message.Header>Drop files</Message.Header>
                </Message.Content>
              </Message>
            )}
          </Dropzone>
        </DropzoneStyle>

        {accepted.length > 0 && (
          <div style={{ textAlign: 'right' }}>
            <Button
              content="Upload photos"
              color="green"
              icon="upload"
              style={{ margin: '10px 0px 2px 0px' }}
              loading={uploading}
              onClick={() => this.handleUpload(accepted)}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

const iconStyle = {
  display: 'flex',
  zIndex: '10',
  width: '100%',
  height: '100%',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  top: '0px',
};

const DropzoneStyle = styled.section`
  height: 100%;
  width: 100%;

  .Dropzone {
    width: 100%;
    min-height: 200px;
    border-width: 2px;
    border-color: rgb(102, 102, 102);
    border-style: dashed;
    border-radius: 5px;
  }

  .Dropzone:hover {
    cursor: pointer;
  }

  .Accepted {
    width: 100%;
    padding: 20px;
    display: flex;
  }
`;

export default FileUpload;
