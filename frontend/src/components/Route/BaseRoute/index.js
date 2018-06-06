import React from 'react';
import { galleryPath } from '../../../lib/paths';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LandingNavbar from '../../nav/LandingNavbar';

class BaseRoute extends React.Component {
  render() {
    const { isLoggedIn, component: Component, ...rest } = this.props;

    return isLoggedIn ? (
      <Redirect to={galleryPath} />
    ) : (
      <LandingNavbar {...rest}>
        <Route {...rest} render={props => <Component {...props} />} />
      </LandingNavbar>
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
