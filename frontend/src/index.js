import React from 'react';
import App from './components/App';
import configureStore, { history } from './stores';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

const store = configureStore();

function renderApp() {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
}

renderApp();

if (module.hot) {
  module.hot.accept(['./components/App'], () => {
    renderApp();
  });

  module.hot.accept(['./stores/'], () => {
    renderApp();
  });
}
