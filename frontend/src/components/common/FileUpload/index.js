// @flow
import * as React from 'react';
import Dropzone from '../Dropzone';
import styled from 'styled-components';

type Props = {
  disabled?: boolean,
  accept: string,
  error?: string,
  handleAcceptedFiles: Function,
};

const FileUpload = ({ disabled, error, accept, handleAcceptedFiles }: Props) => {
  return (
    <DropzoneStyle className="FileUpload">
      <Dropzone
        disabled={disabled}
        handleAcceptedFiles={handleAcceptedFiles}
        accept={accept}
        error={error}
      />
    </DropzoneStyle>
  );
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
