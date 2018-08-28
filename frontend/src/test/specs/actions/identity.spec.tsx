import { expect } from 'chai';

import { setIdentity } from '../../../actions/identity';
import * as actionTypes from '../../../constants/actionTypes';
import { TEST_IDENTITY } from '../../data/identity';

describe('Identity actions', () => {
  describe('SET_IDENTITY', () => {
    it('Should create an action to set identity', () => {
      expect(setIdentity(TEST_IDENTITY)).to.deep.equal({
        type: actionTypes.SET_IDENTITY,
        identity: TEST_IDENTITY,
      });
    });
  });
});
