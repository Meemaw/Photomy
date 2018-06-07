import api from './lib/api';
import { CONFIG } from './lib/core';

const { GET, POST, DELETE, PUT, PATCH } = api;

export const ImagesApi = {
  list: GET(`${CONFIG.services.baseUrl}/gallery/matches`),
  list_images: GET(`${CONFIG.services.baseUrl}/gallery/images`),
  upload_url: POST(`${CONFIG.services.baseUrl}/gallery/upload_url`),
  upload_image_file: POST(`${CONFIG.services.baseUrl}/gallery/upload_file`),
  list_people: GET(`${CONFIG.services.baseUrl}/gallery/people`),
  person: GET(`${CONFIG.services.baseUrl}/gallery/identity/:identity_id/images`),
  delete: DELETE(`${CONFIG.services.baseUrl}/gallery/images/:image_id`),
  favorites: GET(`${CONFIG.services.baseUrl}/gallery/favorites`),
  update: PATCH(`${CONFIG.services.baseUrl}/gallery/images/:image_id`),
};

export const IdentityMatchApi = {
  patch: PATCH(`${CONFIG.services.baseUrl}/gallery/identity_match/:identity_match_id`),
  reject: GET(`${CONFIG.services.baseUrl}/gallery/identity_match/:identity_match_id/reject`),
  mergeIdentities: GET(
    `${
      CONFIG.services.baseUrl
    }/gallery/identity_match/merge_identities/:base_identity_id/:join_identity_id`,
  ),
};

export const IdentityApi = {
  get: GET(`${CONFIG.services.baseUrl}/gallery/identity/:identity_id`),
  put: PUT(`${CONFIG.services.baseUrl}/gallery/identity/:id`),
  list: GET(`${CONFIG.services.baseUrl}/gallery/identity`),
  getRepresentatives: GET(
    `${CONFIG.services.baseUrl}/gallery/identity/:identity_id/representatives`,
  ),
  getNeighbours: GET(`${CONFIG.services.baseUrl}/gallery/identity/:identity_id/neighbours`),
};

export const AuthApi = {
  register: POST(`${CONFIG.services.baseUrl}/rest-auth/registration/`, false),
  resetPassword: POST(`${CONFIG.services.baseUrl}/rest-auth/password/reset/`, false),
  resetConfirm: POST(`${CONFIG.services.baseUrl}/rest-auth/password/reset/confirm/`, false),
  login: POST(`${CONFIG.services.baseUrl}/rest-auth/login/`, false),
  logout: POST(`${CONFIG.services.baseUrl}/rest-auth/logout/`),
  authorize: GET(`${CONFIG.services.cdnBaseUrl}/authorize`, false),
};

export const UserAuthApi = {
  get: GET(`${CONFIG.services.baseUrl}/auth/me`),
  update: PUT(`${CONFIG.services.baseUrl}/auth/me`),
  delete: DELETE(`${CONFIG.services.baseUrl}/auth/me`),
  changePassword: POST(`${CONFIG.services.baseUrl}/rest-auth/password/change/`),
};
