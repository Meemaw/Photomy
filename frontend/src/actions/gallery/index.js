// @flow
import * as actionTypes from '../../constants/actionTypes';
import type { Image } from '../../meta/types/Image';

export const setFetchingImages = (galleryType: string, fetchingImages: boolean) => {
  return {
    type: actionTypes.FETCHING_IMAGES,
    fetchingImages,
    galleryType,
  };
};

export const uploadImages = (images: Array<Image>) => {
  return {
    type: actionTypes.UPLOAD_IMAGES,
    images,
  };
};

export const deleteImage = (image: Image, galleryType: string) => {
  return {
    type: actionTypes.DELETE_IMAGE,
    galleryType,
    image,
  };
};

export const favoriteImage = (image: Image, galleryType: string) => {
  return {
    type: actionTypes.FAVORITE_IMAGE,
    galleryType,
    image,
  };
};

export const fetchImages = (fetchFunction: any, fetchArguments: any, galleryType: string) => {
  return (dispatch: any) => {
    dispatch(setFetchingImages(galleryType, true));

    fetchFunction(fetchArguments)
      .then(resp => {
        dispatch(setFetchingImages(galleryType, false));
        const images = resp.results.map(image => ({
          ...image,
          uploaded_at: new Date(image.uploaded_at),
        }));

        const dataMap = images.reduce((acc, image, ix) => {
          acc[image.image_id] = { ...image, ix };
          return acc;
        }, {});

        dispatch({
          type: actionTypes.FETCH_IMAGES,
          galleryType,
          images,
          dataMap,
          next: resp.next,
          totalCount: resp.count,
          updatedAt: new Date(),
        });
      })
      .catch(err => console.log(err));
  };
};
