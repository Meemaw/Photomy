import React from 'react';
import Maintanance from '../../components/Maintanance';
import { connect } from 'react-redux';
import { setAuthTokenChecked, setAuthUser, setAppError } from '../../actions';
import { getAccessToken, isTokenValid } from '../../lib/auth';
import { UserAuthApi } from '../../services';

function withAuthorization(WrappedComponent) {
  function mapStateToProps(state) {
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

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    class Authorization extends React.Component {
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

        return !tokenChecked ? <div /> : <WrappedComponent />;
      }
    },
  );
}

export default withAuthorization;
