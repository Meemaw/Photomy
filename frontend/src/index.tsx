import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import configureStore, { history } from './store';

const store = configureStore();

function renderApp(PhotomyApp: any) {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PhotomyApp />
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
