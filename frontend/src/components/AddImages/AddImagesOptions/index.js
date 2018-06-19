// @flow
import React from 'react';
import FormInputField from '../../common/FormInputField';
import styled from 'styled-components';
import { Form } from 'semantic-ui-react';
import { onlyUpdateForKeys } from 'recompose';

type Props = {
  setUploadWithLink: Function,
  uploadWithLink: boolean,
  setRecognizePeople: Function,
  recognizePeople: boolean,
  isAlbum: boolean,
  highQuality: boolean,
  setAlbumQuality: Function,
  albumName: string,
  setAlbumName: Function,
};

const AddImagesOptions = ({
  albumName,
  setAlbumName,
  setAlbumQuality,
  highQuality,
  isAlbum,
  recognizePeople,
  setRecognizePeople,
  uploadWithLink,
  setUploadWithLink,
}: Props) => {
  return (
    <Form style={{ width: '250px' }}>
      {isAlbum && (
        <FormInputField
          fluid
          placeholder="Album name"
          fieldName="album_name"
          value={albumName}
          onChange={(e, { value }) => setAlbumName(value)}
        />
      )}
      <FormLabel>Options</FormLabel>
      <Form.Checkbox
        style={{ fontSize: '0.82em', textAlign: 'left', marginTop: '10px' }}
        label="Upload with link"
        checked={uploadWithLink}
        onChange={(e, { checked }) => setUploadWithLink(checked)}
      />
      <Form.Checkbox
        style={{ fontSize: '0.82em', textAlign: 'left' }}
        label="High quality"
        checked={highQuality}
        onChange={(e, { checked }) => setAlbumQuality(checked)}
      />
      <Form.Checkbox
        style={{ fontSize: '0.82em', textAlign: 'left' }}
        label="Recognize people"
        checked={recognizePeople}
        onChange={(e, { checked }) => setRecognizePeople(checked)}
      />
      <FormLabel>Change date</FormLabel>
    </Form>
  );
};

const FormLabel = styled.label`
  font-weight: 700;
  font-size: 0.85rem;
`;

export default onlyUpdateForKeys([
  'albumName',
  'highQuality',
  'isAlbum',
  'recognizePeople',
  'uploadWithLink',
])(AddImagesOptions);
