import * as actionTypes from '../../../constants/actionTypes';
import { setIdentity } from '../../../actions/identity';

const TEST_IDENTITY = {
  id: '5',
  identity: 'Matej',
};

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
