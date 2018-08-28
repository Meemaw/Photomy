import { Image } from '../../meta/types/Image';
import { TEST_ALBUM, TEST_ALBUM_2 } from './album';
import { TEST_IDENTITY } from './identity';

export const TEST_IMAGE: Image = {
  id: '1',
  image_url: 'opa',
  uploaded_at: new Date(),
  image_id: '10',
  favorite: true,
  confirmed: true,
  processing_status: 'ba',
  identity_group_id: TEST_IDENTITY.id!,
  albums: [TEST_ALBUM, TEST_ALBUM_2],
  preview_url: '',
  ix: 0,
  image_identity: '',
};

export const TEST_IMAGES = [
  {
    ...TEST_IMAGE,
    favorite: false,
  },
  {
    ...TEST_IMAGE,
    image_id: '11',
    id: '2',
  },
];
