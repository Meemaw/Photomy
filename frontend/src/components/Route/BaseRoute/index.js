// @flow
import React from 'react';
import LandingNavbar from '../../nav/LandingNavbar';
import { galleryPath } from '../../../lib/paths';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

type Props = { isLoggedIn: boolean, component: any, location: Object };
type State = {};

class BaseRoute extends React.Component<Props, State> {
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
