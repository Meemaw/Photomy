// @flow
import * as React from 'react';
import FormInputField from '../../common/FormInputField';
import FormLabel from '../../common/FormLabel';
import SimpleDatePicker from '../../common/SimpleDatePicker';
import LocationSearchInput from '../../common/LocationSearchInput';
import { Form, Menu } from 'semantic-ui-react';
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
  photosTakenOn: ?Date,
  isCustomDate: boolean,
  setIsCustomDate: Function,
  handleDateSelection: Function,
  setLocation: Function,
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
  photosTakenOn,
  isCustomDate,
  setIsCustomDate,
  handleDateSelection,
  setLocation,
}: Props) => {
  return (
    <Form style={{ width: '250px' }}>
      {isAlbum && (
        <React.Fragment>
          <FormLabel>Album name</FormLabel>
          <FormInputField
            fluid
            placeholder="Summer in Miami..."
            fieldName="album_name"
            value={albumName}
            onChange={(e, { value }) => setAlbumName(value)}
          />
        </React.Fragment>
      )}

      <FormLabel>Location</FormLabel>
      <LocationSearchInput setLocation={setLocation} />
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
      <br />

      <Menu compact size="mini">
        <Menu.Item active={!isCustomDate} onClick={() => setIsCustomDate(false)}>
          Use current date
        </Menu.Item>
        <Menu.Item active={isCustomDate} onClick={() => setIsCustomDate(true)}>
          Pick a date
        </Menu.Item>
      </Menu>

      {isCustomDate && <SimpleDatePicker handleDateSelection={handleDateSelection} />}
    </Form>
  );
};

export default onlyUpdateForKeys([
  'albumName',
  'highQuality',
  'isAlbum',
  'recognizePeople',
  'uploadWithLink',
  'isCustomDate',
])(AddImagesOptions);
