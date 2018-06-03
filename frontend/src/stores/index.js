import * as reducers from '../reducers';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer as routing, routerMiddleware } from 'react-router-redux';

export const history = createHistory();

const enhancers = [];
const middleware = [routerMiddleware(history), thunk];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

export default function configureStore(initialState = {}) {
  const rootReducer = combineReducers({
    ...reducers,
    routing,
  });

  return createStore(rootReducer, initialState, composedEnhancers);
}
