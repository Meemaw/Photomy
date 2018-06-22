import * as actionTypes from '../../../constants/actionTypes';
import authReducer, { INITIAL_STATE } from '../../../reducers/auth';

const TEST_USER = { id: '15', username: 'Meemaw' };

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    const state = authReducer(undefined, {});
    expect(state).to.deep.equal(INITIAL_STATE);
  });

  describe('SET_AUTH_USER', () => {
    it('Sets auth user', () => {
      const state = authReducer(INITIAL_STATE, {
        type: actionTypes.SET_AUTH_USER,
        authUser: TEST_USER,
      });

      expect(state).to.deep.equal({ ...INITIAL_STATE, user: TEST_USER, isLoggedIn: true });
    });
  });

  describe('SET_AUTH_TOKEN_CHECKED', () => {
    it('Sets auth token checked', () => {
      const state = authReducer(INITIAL_STATE, {
        type: actionTypes.SET_AUTH_TOKEN_CHECKED,
        tokenChecked: true,
      });

      expect(state).to.deep.equal({ ...INITIAL_STATE, tokenChecked: true });
    });
  });

  describe('LOGOUT', () => {
    it('Logouts', () => {
      const initialState = { ...INITIAL_STATE, isLoggedIn: true, user: TEST_USER };

      const state = authReducer(initialState, {
        type: actionTypes.LOGOUT,
      });

      expect(state).to.deep.equal({ ...INITIAL_STATE, user: {} });
    });
  });

  describe('AUTHORIZE', () => {
    it('Authorizes', () => {
      const state = authReducer(INITIAL_STATE, { type: actionTypes.AUTHORIZE });
      expect(state).to.deep.equal({ ...INITIAL_STATE, isAuthorized: true });
    });
  });
});
