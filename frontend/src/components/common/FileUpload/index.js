// @flow
import * as React from 'react';
import Dropzone from 'react-dropzone';
import GalleryImage from '../../Gallery/GalleryImage';
import styled from 'styled-components';
import type { File } from '../../../meta/types/File';
import LoadingIcon from '../../common/LoadingIcon';
import { Button, Icon, Grid } from 'semantic-ui-react';
import withWidth from '../../../hocs/WithWidth';

type Props = {
  disabled?: boolean,
  accept: string,
  error: ?string,
  uploadFile: File => Promise<*>,
  width: number,
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
    const { disabled, error, accept, width } = this.props;
    const { accepted, uploading } = this.state;
    const actualError = this.state.error || error;

    let num_items_per_row = Math.floor(width / 220);
    if (num_items_per_row < 1) {
      num_items_per_row = 1;
    }
    const num_rows = Math.ceil((accepted.length + 1) / num_items_per_row);
    const columnWidth = width / num_items_per_row;

    return (
      <React.Fragment>
        <DropzoneStyle className="FileUpload" width={`${columnWidth}px`}>
          <Grid columns={num_rows} doubling stackable style={{ width: '100%', margin: '0px' }}>
            {accepted.map((file, fileIx) => (
              <div style={{ position: 'relative' }} key={fileIx}>
                <GalleryImage src={file.preview} width={columnWidth} />
                {this.renderIcon(fileIx)}
              </div>
            ))}

            <Dropzone
              disabled={disabled}
              onDrop={this.handleDrop}
              accept={accept}
              className="Dropzone"
            >
              {actualError ? (
                <p style={{ color: 'red' }}>{actualError}</p>
              ) : (
                <Icon name="plus" style={{ width: '100%' }} size="large" />
              )}
            </Dropzone>
          </Grid>
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
  display: flex;

  .Dropzone {
    min-height: ${props => props.height || '220px'};
    min-width: ${props => props.width || '220px'};
    border: 2px dashed #dddfe2;
    border-radius: 2px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .Dropzone:hover {
    cursor: pointer;
  }

  .Accepted {
    padding: 20px;
    display: flex;
  }
`;

export default withWidth(FileUpload);
