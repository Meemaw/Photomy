// @flow
import * as React from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

type Props = {
  disabled?: boolean,
  accept: string,
  error?: string,
  handleAcceptedFiles: Function,
};

type State = {
  error: ?string,
};

class FileUpload extends React.PureComponent<Props, State> {
  state = {
    error: null,
  };

  static defaultProps = {
    disabled: false,
    accept: 'image/jpeg, image/png',
  };

  handleDrop = (accepted: Array<any>, rejected: Array<any>) => {
    const { accept, handleAcceptedFiles } = this.props;

    if (accepted.length > 0) {
      handleAcceptedFiles(accepted);
      this.setState({
        error: null,
      });
    } else {
      this.setState({ error: `Supported file formats: [${accept}]` });
    }
  };

  render() {
    const { disabled, error, accept } = this.props;
    const actualError = this.state.error || error;

    return (
      <DropzoneStyle className="FileUpload">
        <Dropzone disabled={disabled} onDrop={this.handleDrop} accept={accept} className="Dropzone">
          {actualError ? (
            <p style={{ color: 'red' }}>{actualError}</p>
          ) : (
            <Icon name="plus" style={{ width: '100%' }} size="large" />
          )}
        </Dropzone>
      </DropzoneStyle>
    );
  }
}

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
    margin: 5px;
  }

  .Dropzone:hover {
    cursor: pointer;
  }

  .Accepted {
    padding: 20px;
    display: flex;
  }
`;

export default FileUpload;
