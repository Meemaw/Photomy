import * as actionTypes from '../../constants/actionTypes';
import { User } from '../../meta/types/User';

export interface ISetAuthUser {
  type: actionTypes.SET_AUTH_USER;
  authUser: User;
}

export interface ISetAuthTokenChecked {
  type: actionTypes.SET_AUTH_TOKEN_CHECKED;
  tokenChecked: boolean;
}

export interface ILogout {
  type: actionTypes.LOGOUT;
}

export interface IAuthorize {
  type: actionTypes.AUTHORIZE;
}

export const setAuthUser = (authUser: User): ISetAuthUser => ({
  authUser,
  type: actionTypes.SET_AUTH_USER,
});

export const setAuthTokenChecked = (tokenChecked: boolean): ISetAuthTokenChecked => ({
  tokenChecked,
  type: actionTypes.SET_AUTH_TOKEN_CHECKED,
});

export const logout = (): ILogout => ({
  type: actionTypes.LOGOUT,
});

export const authorize = (): IAuthorize => ({
  type: actionTypes.AUTHORIZE,
});
