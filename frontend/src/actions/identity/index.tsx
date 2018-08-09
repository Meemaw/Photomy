import * as actionTypes from '../../constants/actionTypes';
import { Identity } from '../../meta/types/Identity';

export interface ISetIdentity {
  type: actionTypes.SET_IDENTITY;
  identity: Identity;
}

export const setIdentity = (identity: Identity) => ({
  identity,
  type: actionTypes.SET_IDENTITY,
});
