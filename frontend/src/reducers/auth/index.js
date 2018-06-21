// @flow
import * as actionTypes from '../../constants/actionTypes';
import type { AuthState } from '../../meta/types/AuthState';

export const INITIAL_STATE: AuthState = {
  user: null,
  isLoggedIn: false,
  tokenChecked: false,
  isAuthorized: false,
};

const auth = (state: AuthState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case actionTypes.SET_AUTH_USER:
      return setUser(state, action.authUser);
    case actionTypes.SET_AUTH_TOKEN_CHECKED:
      return setToken(state, action.tokenChecked);
    case actionTypes.LOGOUT:
      return logout(state);
    case actionTypes.AUTHORIZE:
      return { ...state, isAuthorized: true };
    default:
      return state;
  }
};

function setToken(state, tokenChecked) {
  return { ...state, tokenChecked };
}

function setUser(state, user) {
  return { ...state, user: user, isLoggedIn: true };
}

function logout(state) {
  localStorage.clear();
  return { ...state, user: {}, isLoggedIn: false };
}

export default auth;
