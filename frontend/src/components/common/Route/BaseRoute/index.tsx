import * as React from 'react';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { galleryPath } from '../../../../constants/paths';
import { StoreState } from '../../../../meta/types/Store';
import LandingNavbar from '../../../nav/LandingNavbar';

interface Props extends RouteProps {
  isLoggedIn: boolean;
  component: React.ComponentClass<any>;
}

const BaseRoute = ({ isLoggedIn, component: Component, ...rest }: Props) =>
  isLoggedIn ? (
    <Redirect to={galleryPath} />
  ) : (
    <LandingNavbar {...rest}>
      <Route {...rest} render={props => <Component {...props} />} />
    </LandingNavbar>
  );

function mapStateToProps(state: StoreState) {
  return { isLoggedIn: state.auth.isLoggedIn };
}

const connected = connect(
  mapStateToProps,
  null,
)(BaseRoute);

export default withRouter(connected as React.ComponentType<any>);
