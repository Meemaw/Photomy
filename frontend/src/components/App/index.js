import React from 'react';
import Routes from '../Routes';
import Raven from 'raven-js';
import { withAuthorization } from '../../hocs';
import { withRouter } from 'react-router-dom';
import { CONFIG } from '../../lib/core';
import { VERSION_INFO } from '../../version';

class App extends React.Component {
  constructor(props) {
    super(props);
    if (CONFIG.sentry.enable) {
      Raven.config(CONFIG.sentry.dsn, {
        environment: CONFIG.sentry.env,
        release: VERSION_INFO.tag,
      }).install();
    }
  }

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export { App };

export default withRouter(withAuthorization(App));
