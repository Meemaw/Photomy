const ALBUM_REGEX = /^\/albums\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/;

export const isAlbumPath = (path: string) => {
  const match = path.match(ALBUM_REGEX);

  if (match) {
    return match[1];
  }
  return null;
};
