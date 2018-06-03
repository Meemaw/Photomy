// @flow
import * as actionTypes from '../../constants/actionTypes';

export const setIdentity = (identity: Object) => ({
  type: actionTypes.SET_IDENTITY,
  identity,
});
