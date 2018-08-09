import api from './lib/api';
import { CONFIG } from './lib/core';

const { GET, POST, DELETE, PUT, PATCH } = api;

const GALLERY_API_BASE_URL = `${CONFIG.services.baseUrl}/gallery`;
const AUTHENTICATION_API_BASE_URL = `${CONFIG.services.baseUrl}/rest-auth`;
const AUTH_INFO_API_BASE_URL = `${CONFIG.services.baseUrl}/auth`;
const ALBUMS_API_BASE_URL = `${GALLERY_API_BASE_URL}/albums`;
const IDENTITY_MATCH_API_BASE_URL = `${GALLERY_API_BASE_URL}/identity_match`;

export const ImagesApi = {
  list: GET(`${GALLERY_API_BASE_URL}/matches`),
  list_images: GET(`${GALLERY_API_BASE_URL}/images`),
  upload_url: POST(`${GALLERY_API_BASE_URL}/upload_url`),
  upload_image_file: POST(`${GALLERY_API_BASE_URL}/upload_file`),
  list_people: GET(`${GALLERY_API_BASE_URL}/people`),
  person: GET(`${GALLERY_API_BASE_URL}/identity/:identity_id/images`),
  delete: DELETE(`${GALLERY_API_BASE_URL}/images/:image_id`),
  favorites: GET(`${GALLERY_API_BASE_URL}/favorites`),
  update: PATCH(`${GALLERY_API_BASE_URL}/images/:image_id`),
};
export type ImagesApi = typeof ImagesApi;

export const IdentityMatchApi = {
  patch: PATCH(`${IDENTITY_MATCH_API_BASE_URL}/:identity_match_id`),
  reject: GET(`${IDENTITY_MATCH_API_BASE_URL}/:identity_match_id/reject`),
  mergeIdentities: GET(
    `${IDENTITY_MATCH_API_BASE_URL}/merge_identities/:base_identity_id/:join_identity_id`,
  ),
};
export type IdentityMatchApi = typeof IdentityMatchApi;

export const IdentityApi = {
  get: GET(`${GALLERY_API_BASE_URL}/identity/:identity_id`),
  put: PUT(`${GALLERY_API_BASE_URL}/identity/:id`),
  list: GET(`${GALLERY_API_BASE_URL}/identity`),
  getRepresentatives: GET(`${GALLERY_API_BASE_URL}/identity/:identity_id/representatives`),
  getNeighbours: GET(`${GALLERY_API_BASE_URL}/identity/:identity_id/neighbours`),
};
export type IdentityApi = typeof IdentityApi;

export const AuthApi = {
  register: POST(`${AUTHENTICATION_API_BASE_URL}/registration/`, false),
  resetPassword: POST(`${AUTHENTICATION_API_BASE_URL}/password/reset/`, false),
  resetConfirm: POST(`${AUTHENTICATION_API_BASE_URL}/password/reset/confirm/`, false),
  login: POST(`${AUTHENTICATION_API_BASE_URL}/login/`, false),
  logout: POST(`${AUTHENTICATION_API_BASE_URL}/logout/`),
  changePassword: POST(`${AUTHENTICATION_API_BASE_URL}/password/change/`),
};
export type AuthApi = typeof AuthApi;

export const LambdaApi = {
  authorize: GET(`${CONFIG.services.cdnBaseUrl}/authorize`, false),
};
export type LambdaApi = typeof LambdaApi;

export const UserAuthApi = {
  get: GET(`${AUTH_INFO_API_BASE_URL}/me`),
  update: PUT(`${AUTH_INFO_API_BASE_URL}/me`),
  delete: DELETE(`${AUTH_INFO_API_BASE_URL}/me`),
  patch: PATCH(`${AUTH_INFO_API_BASE_URL}/me`),
};
export type UserAuthApi = typeof UserAuthApi;

export const AlbumsApi = {
  create: POST(`${ALBUMS_API_BASE_URL}`),
  getAlbum: GET(`${ALBUMS_API_BASE_URL}/:album_id`),
  list: GET(`${ALBUMS_API_BASE_URL}`),
  delete: DELETE(`${ALBUMS_API_BASE_URL}/:album_id`),
  patch: PATCH(`${ALBUMS_API_BASE_URL}/:albumId`),
  addImage: POST(`${ALBUMS_API_BASE_URL}/:albumId/addImage/:image_id`),
  removeImage: DELETE(`${ALBUMS_API_BASE_URL}/:albumId/removeImage/:image_id`),
  setCoverImage: POST(`${ALBUMS_API_BASE_URL}/:albumId/setCoverImage/:image_id`),
};
export type AlbumsApi = typeof AlbumsApi;
