import * as React from 'react';
import { connect } from 'react-redux';

import { setAppError, setAuthTokenChecked, setAuthUser } from '../../actions';
import Maintanance from '../../components/common/Maintanance';
import { getAccessToken, isTokenValid } from '../../lib/auth';
import { HOC } from '../../meta/types/Hoc';
import { StoreState } from '../../meta/types/Store';
import { UserAuthApi } from '../../services';

export interface AuthorizationProps {
  setAuthUser: any;
  setAppError: any;
  setAuthTokenChecked: any;
  tokenChecked: any;
  appError: any;
}

const withAuthorization = <P, S>(WrappedComponent: HOC<P, AuthorizationProps>) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    class Authorization extends React.Component<P & AuthorizationProps, S> {
      async componentDidMount() {
        const { token } = getAccessToken();

        if (isTokenValid(token)) {
          try {
            const user = await UserAuthApi.get();
            this.props.setAuthUser(user);
          } catch (e) {
            this.props.setAppError();
          }
        }

        this.props.setAuthTokenChecked(true);
      }

      render() {
        const { tokenChecked, appError } = this.props;

        if (appError) {
          return <Maintanance />;
        }

        return !tokenChecked ? null : <WrappedComponent {...this.props} />;
      }
    },
  );
};

function mapStateToProps(state: StoreState) {
  return {
    tokenChecked: state.auth.tokenChecked,
    appError: state.ui.appError,
  };
}

const mapDispatchToProps = {
  setAuthTokenChecked,
  setAuthUser,
  setAppError,
};

export default withAuthorization;
