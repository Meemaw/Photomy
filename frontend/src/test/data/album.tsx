export const TEST_ALBUM = {
  id: '5',
  uploaded_at: new Date(),
  images: [],
  name: 'Pariz 2016',
  images_count: 0,
  cover_image_url: 'http://www.photomy.si',
  albumName: 'Pariz 2016',
  image_id: '9',
};

export const TEST_ALBUM_2 = {
  id: '4',
  uploaded_at: new Date(),
  images: [],
  name: 'Pariz 2016',
  images_count: 0,
  cover_image_url: 'http://www.photomy.si',
  albumName: 'Pariz 2016',
  image_id: '10',
};

export const TEST_ALBUM_3 = {
  id: '3',
  uploaded_at: new Date(),
  images: [],
  name: 'Pariz 2016',
  images_count: 0,
  cover_image_url: 'http://www.photomy.si',
  albumName: 'Pariz 2016',
  image_id: '10',
};

export const RANDOM_ALBUM = { ...TEST_ALBUM_3, id: '10', name: 'RANDOM_ALBUM' };

export const RENAMED_ALBUM = { ...TEST_ALBUM, name: 'RENAMED_ALBUM' };
