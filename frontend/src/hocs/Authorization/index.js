import React from 'react';
import { connect } from 'react-redux';
import { setAuthTokenChecked, setAuthUser } from '../../actions';
import { getAccessToken, isTokenValid } from '../../lib/auth';
import { UserAuthApi } from '../../services';

function withAuthorization(WrappedComponent) {
  function mapStateToProps(state) {
    return {
      tokenChecked: state.auth.tokenChecked,
    };
  }

  const mapDispatchToProps = {
    setAuthTokenChecked,
    setAuthUser,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    class Authorization extends React.Component {
      async componentDidMount() {
        const { token } = getAccessToken();

        if (isTokenValid(token)) {
          const user = await UserAuthApi.get();
          this.props.setAuthUser(user);
        }

        this.props.setAuthTokenChecked(true);
      }

      render() {
        const { tokenChecked } = this.props;
        return !tokenChecked ? <div /> : <WrappedComponent />;
      }
    },
  );
}

export default withAuthorization;
