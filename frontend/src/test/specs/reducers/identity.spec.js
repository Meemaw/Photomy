import * as actionTypes from '../../../constants/actionTypes';
import identityReducer, { INITIAL_STATE } from '../../../reducers/identity';

const TEST_IDENTITY = {
  identity: 'Marko',
  id: '1',
};

describe('Identity reducer', () => {
  it('should return the initial state', () => {
    const state = identityReducer(undefined, {});
    expect(state).to.deep.equal(INITIAL_STATE);
  });

  describe('SET_IDENTITY', () => {
    const state = identityReducer(INITIAL_STATE, {
      type: actionTypes.SET_IDENTITY,
      identity: TEST_IDENTITY,
    });
    expect(state).to.equal(TEST_IDENTITY);
  });
});
