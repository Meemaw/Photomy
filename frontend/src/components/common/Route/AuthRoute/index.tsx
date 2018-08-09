import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { authorize } from '../../../../actions';
import { loginPath } from '../../../../constants/paths';
import { StoreState } from '../../../../meta/types/Store';
import { LambdaApi } from '../../../../services';

interface Props extends RouteComponentProps<any> {
  authorize: any;
  authUser: any;
  isAuthorized: any;
  isLoggedIn: any;
  component: any;
}

class AuthRoute extends React.Component<Props, object> {
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
        .then(_ => this.props.authorize())
        .catch(err => {
          authorize();
          // console.log(err);
        });

      return <div />;
    }

    return <Route {...rest} render={props => <Component {...props} />} />;
  }
}

function mapStateToProps(state: StoreState) {
  return {
    authUser: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    isAuthorized: state.auth.isAuthorized,
  };
}

const mapDispatchToProps = {
  authorize,
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthRoute);

export default withRouter(connected as React.ComponentType<any>);
