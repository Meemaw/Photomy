import * as React from 'react';
import { onlyUpdateForKeys } from 'recompose';
import { Form, Menu } from 'semantic-ui-react';

import FormInputField from '../../common/FormInputField';
import FormLabel from '../../common/FormLabel';
import LocationSearchInput from '../../common/LocationSearchInput';
import SimpleDatePicker from '../../common/SimpleDatePicker';

type Props = {
  setUploadWithLink: any;
  uploadWithLink: boolean;
  setRecognizePeople: any;
  recognizePeople: boolean;
  isAlbum: boolean;
  highQuality: boolean;
  setAlbumQuality: any;
  albumName: string;
  setAlbumName: any;
  photosTakenOn?: Date;
  isCustomDate: boolean;
  setIsCustomDate: any;
  handleDateSelection: any;
  setLocation: any;
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
  isCustomDate,
  setIsCustomDate,
  handleDateSelection,
  setLocation,
}: Props) => {
  console.log(albumName);
  return (
    <Form style={{ width: '250px' }}>
      {isAlbum && (
        <React.Fragment>
          <FormLabel>Album name</FormLabel>
          <FormInputField
            fluid={true}
            placeholder="Summer in Miami..."
            fieldName="albumName"
            value={albumName}
            handleChange={(_: any, { value }: any) => setAlbumName(value)}
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

      <Menu compact={true} size="mini">
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
