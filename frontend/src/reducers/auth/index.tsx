import * as actionTypes from '../../constants/actionTypes';
import { AuthState } from '../../meta/types/Store';
import { User } from '../../meta/types/User';

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

function setToken(state: AuthState, tokenChecked: boolean) {
  return { ...state, tokenChecked };
}

function setUser(state: AuthState, user: User) {
  return { ...state, user, isLoggedIn: true };
}

function logout(state: AuthState) {
  localStorage.clear();
  return { ...state, user: {}, isLoggedIn: false };
}

export default auth;
