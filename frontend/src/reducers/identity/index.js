// @flow
import * as actionTypes from '../../constants/actionTypes';
import { IdentityState } from '../../meta/types/IdentityState';

const INITIAL_STATE: IdentityState = {};

const identity = (state: IdentityState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case actionTypes.SET_IDENTITY:
      return action.identity;
    default:
      return state;
  }
};

export default identity;
