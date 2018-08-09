import { expect } from 'chai';

import * as actionTypes from '../../../constants/actionTypes';
import identityReducer, { INITIAL_STATE } from '../../../reducers/identity';
import { TEST_IDENTITY } from '../../data/identity';

describe('Identity reducer', () => {
  it('SET_IDENTITY', () => {
    const state = identityReducer(INITIAL_STATE, {
      type: actionTypes.SET_IDENTITY,
      identity: TEST_IDENTITY,
    });
    expect(state).to.deep.equal(TEST_IDENTITY);
  });
});
