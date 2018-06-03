import * as actionTypes from '../../constants/actionTypes';

const INITIAL_STATE = {};

const identity = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_IDENTITY:
      return action.identity;
    default:
      return state;
  }
};

export default identity;
