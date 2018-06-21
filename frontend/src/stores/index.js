// @flow
import * as reducers from '../reducers';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import api from '../lib/api';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer as routing, routerMiddleware } from 'react-router-redux';
import { logout } from '../actions';

export const history = createHistory();

const enhancers = [];
const middleware = [routerMiddleware(history), thunk];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

export default function initStore(initialState: Object = {}) {
  const rootReducer = combineReducers({
    ...reducers,
    routing,
  });

  const store = createStore(rootReducer, initialState, composedEnhancers);

  api.on('401', url => {
    store.dispatch(logout());
  });

  return store;
}
