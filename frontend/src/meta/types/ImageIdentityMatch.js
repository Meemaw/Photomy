// @flow

import type { Image } from './Image';

export type ImageIdentityMatch = Image & {
  confirmed: boolean,
  face_index: number,
  image_identity: string,
  identity_group_id: string,
  identity_match_id: string,
};
