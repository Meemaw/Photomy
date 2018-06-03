// @flow
import React from 'react';
import AccountSettings from './AccountSettings';
import { connect } from 'react-redux';
import type { User } from '../../../../meta/types/User';

type Props = { authUser: User };
type State = {};

function mapStateToProps(state) {
  return {
    authUser: state.auth.user,
  };
}

class AcccountSettingsContainer extends React.Component<Props, State> {
  render() {
    const { authUser } = this.props;
    return <AccountSettings authUser={authUser} />;
  }
}

export default connect(
  mapStateToProps,
  null,
)(AcccountSettingsContainer);
