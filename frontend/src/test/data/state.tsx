import { TEST_ALBUM, TEST_ALBUM_2 } from './album';
import { INITIAL_STATE } from '../../reducers/albums';
import { GALLERY_TYPES } from '../../constants/galleryTypes';
import { Image } from '../../meta/types/Image';
import { GalleryType } from '../../meta/types/GalleryType';
import { TEST_IMAGES } from './image';
import { buildDataMap } from '../../reducers/gallery/util';

export const TEST_ALBUMS_STATE = {
  ...INITIAL_STATE,
  albums: [TEST_ALBUM, TEST_ALBUM_2],
};

export const TEST_GALLERY_STATE = GALLERY_TYPES.reduce((galleries, gallery) => {
  const images: Image[] =
    gallery.galleryType === GalleryType.FAVORITE_GALLERY
      ? TEST_IMAGES.filter(image => image.favorite)
      : TEST_IMAGES;

  const dataMap = buildDataMap(images);

  galleries[gallery.galleryType] = {
    count: TEST_IMAGES.length,
    images: images,
    fetchingImages: false,
    dataMap: dataMap,
    next: null,
    totalCount: TEST_IMAGES.length,
    updatedAt: new Date(),
    isEmpty: false,
  };
  return galleries;
}, {});
