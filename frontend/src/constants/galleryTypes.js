// @flow
export const ALL_PHOTOS_GALLERY = 'ALL_PHOTOS';
export const PEOPLE_GALLERY = 'PEOPLE_GALLERY';
export const FAVORITE_GALLERY = 'FAVORITE_GALLERY';
export const ALBUM_GALLERY = 'ALBUM_GALLERY';

export const GALLERY_TYPES = [
  { galleryType: ALL_PHOTOS_GALLERY, icon: 'image', niceName: 'All Photos' },
  { galleryType: FAVORITE_GALLERY, icon: 'heart', niceName: ' Favorites' },
  { galleryType: PEOPLE_GALLERY, icon: 'user', niceName: 'People' },
  { galleryType: ALBUM_GALLERY, icon: 'image', niceName: 'Albums' },
];

export const GALLERY_REDUCERS = GALLERY_TYPES.filter(
  gallery => gallery.galleryType !== ALBUM_GALLERY,
);
