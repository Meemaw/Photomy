import { GalleryType } from '../meta/types/GalleryType';

export type GalleryTypeOption = {
  galleryType: GalleryType;
  icon: string;
  niceName: string;
};

export const GALLERY_TYPES: GalleryTypeOption[] = [
  {
    galleryType: GalleryType.ALL_PHOTOS_GALLERY,
    icon: 'image',
    niceName: 'All Photos',
  },
  {
    galleryType: GalleryType.FAVORITE_GALLERY,
    icon: 'heart',
    niceName: ' Favorites',
  },
  { galleryType: GalleryType.PEOPLE_GALLERY, icon: 'user', niceName: 'People' },
  { galleryType: GalleryType.ALBUM_GALLERY, icon: 'image', niceName: 'Albums' },
];

export const GALLERY_REDUCERS = GALLERY_TYPES.filter(
  gallery => gallery.galleryType !== GalleryType.ALBUM_GALLERY,
);
