import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loginPath } from '../../../lib/paths';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AuthApi } from '../../../services';
import { authorize } from '../../../actions';

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

class AuthRoute extends React.Component {
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

      AuthApi.authorize({ userId: id })
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AuthRoute),
);
