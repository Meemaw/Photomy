import * as actionTypes from '../../../constants/actionTypes';
import { setAuthUser, setAuthTokenChecked, logout, authorize } from '../../../actions/auth';

const AUTH_USER = {
  id: '5',
};

describe('Auth actions', () => {
  describe('SET_AUTH_USER', () => {
    it('Should create an action to set auth user', () => {
      expect(setAuthUser(AUTH_USER)).to.deep.equal({
        type: actionTypes.SET_AUTH_USER,
        authUser: AUTH_USER,
      });
    });
  });

  describe('SET_AUTH_TOKEN_CHECKED', () => {
    it('Should create an action to set auth token checked', () => {
      expect(setAuthTokenChecked(true)).to.deep.equal({
        type: actionTypes.SET_AUTH_TOKEN_CHECKED,
        tokenChecked: true,
      });
    });
  });

  describe('LOGOUT', () => {
    it('Should create an action to logout', () => {
      expect(logout()).to.deep.equal({ type: actionTypes.LOGOUT });
    });
  });

  describe('AUTHORIZE', () => {
    it('Should create an action to authorize', () => {
      expect(authorize()).to.deep.equal({ type: actionTypes.AUTHORIZE });
    });
  });
});
