import * as React from 'react';
import { connect } from 'react-redux';

import { withWidth } from '../../../../hocs';
import { StoreState } from '../../../../meta/types/Store';
import { User } from '../../../../meta/types/User';
import AccountSettings from './AccountSettings';

type Props = { authUser: User | null; width?: number };

const AcccountSettingsContainer = ({ authUser, width }: Props) => (
  <AccountSettings authUser={authUser} width={width!} />
);

function mapStateToProps(state: StoreState) {
  return {
    authUser: state.auth.user,
  };
}

const connected = connect(
  mapStateToProps,
  null,
)(AcccountSettingsContainer);

export default withWidth(connected);
