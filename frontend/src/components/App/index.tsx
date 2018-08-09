import * as Raven from 'raven-js';
import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { withAuthorization } from '../../hocs';
import { CONFIG } from '../../lib/core';
import { VERSION_INFO } from '../../version';
import Routes from '../Routes';

class App extends React.Component<object, object> {
  constructor(props: object) {
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

const authorized = withAuthorization(App as any);

export default withRouter(authorized as any);

export { App };
