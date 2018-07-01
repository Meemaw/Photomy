// @flow
import type { Album } from './Album';

export type AlbumsState = {
  albums: Array<Album>,
  albumsFetched: boolean,
  albumsFetching: boolean,
  updatedAt: ?Date,
};
