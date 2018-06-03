// @flow
import * as actionTypes from '../../constants/actionTypes';
import type { User } from '../../meta/types/User';

export const setAuthUser = (authUser: User) => ({
  type: actionTypes.SET_AUTH_USER,
  authUser,
});

export const setAuthTokenChecked = (tokenChecked: boolean) => ({
  type: actionTypes.SET_AUTH_TOKEN_CHECKED,
  tokenChecked,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const authorize = () => ({
  type: actionTypes.AUTHORIZE,
});
