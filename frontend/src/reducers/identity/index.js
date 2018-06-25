// @flow
import * as actionTypes from '../../constants/actionTypes';
import type { IdentityState } from '../../meta/types/IdentityState';

export const INITIAL_STATE: IdentityState = { identity: null };

const identity = (state: IdentityState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case actionTypes.SET_IDENTITY:
      return action.identity;
    default:
      return state;
  }
};

export default identity;
