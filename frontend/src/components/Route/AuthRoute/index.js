// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loginPath } from '../../../lib/paths';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LambdaApi } from '../../../services';
import { authorize } from '../../../actions';
import type { User } from '../../../meta/types/User';

type Props = {
  authorize: Function,
  authUser: User,
  isAuthorized: boolean,
  isLoggedIn: boolean,
  component: any,
};
type State = {};

class AuthRoute extends React.Component<Props, State> {
  render() {
    const {
      authorize,
      authUser,
      isAuthorized,
      isLoggedIn,
      component: Component,
      ...rest
    } = this.props;

    if (!isLoggedIn) {
      return <Redirect to={loginPath} />;
    }

    // TODO fix per app not route
    if (!isAuthorized) {
      const { id } = authUser;

      LambdaApi.authorize({ userId: id })
        .then(resp => authorize())
        .catch(err => {
          authorize();
          console.log(err);
        });

      return <div />;
    }

    return <Route {...rest} render={props => <Component {...props} />} />;
  }
}

function mapStateToProps(state) {
  return {
    authUser: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    isAuthorized: state.auth.isAuthorized,
  };
}

const mapDispatchToProps = {
  authorize,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AuthRoute),
);
