import React from 'react';
import App from './components/App';
import configureStore, { history } from './stores';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

const store = configureStore();

function renderApp(Component) {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
}

renderApp(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    renderApp(NextApp);
  });
}
