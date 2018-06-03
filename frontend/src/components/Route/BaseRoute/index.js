import React from 'react';
import { rootPath } from '../../../lib/paths';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class BaseRoute extends React.Component {
  render() {
    const { isLoggedIn, component: Component, ...rest } = this.props;

    return isLoggedIn ? (
      <Redirect to={rootPath} />
    ) : (
      <Route {...rest} render={props => <Component {...props} />} />
    );
  }
}

function mapStateToProps(state) {
  return { isLoggedIn: state.auth.isLoggedIn };
}

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(BaseRoute),
);
