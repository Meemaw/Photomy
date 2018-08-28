import { ISetIdentity } from '../../actions/identity';
import * as actionTypes from '../../constants/actionTypes';
import { IdentityState } from '../../meta/types/Store';

export const INITIAL_STATE: IdentityState = { identity: undefined };

const identity = (state: IdentityState = INITIAL_STATE, action: ISetIdentity) => {
  switch (action.type) {
    case actionTypes.SET_IDENTITY:
      return { ...state, identity: action.identity };
    default:
      return state;
  }
};

export default identity;
