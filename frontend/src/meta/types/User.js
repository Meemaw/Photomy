// @flow
export type UserId = string;

export type User = {
  id: UserId,
  email: string,
  first_name: string,
  last_name: string,
  avatar: ?string,
};
