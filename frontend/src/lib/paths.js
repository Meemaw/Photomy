// @flow
export const rootPath = '/';

// Gallery paths
export const galleryPath = '/gallery';
export const albumsPath = '/albums';
export const peoplePath = '/people';

// Settings paths
export const settingsPath = '/settings';

// Auth paths
export const loginPath = '/auth/login';
export const registerPath = '/auth/register';
export const passwordResetPath = '/auth/password/reset';
export const confirmationSentPath = '/auth/password/confirmationSent';

const ALBUM_REGEX = /^\/albums\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/;

export const isAlbumPath = (path: string) => {
  const match = path.match(ALBUM_REGEX);

  if (match) {
    return match[1];
  }
  return null;
};
