// @flow
import React from 'react';
import type { User } from '../../../../meta/types/User';
import UserForm from '../../../UserForm';

type Props = { authUser: User };
type State = {};

class AccountSettings extends React.Component<Props, State> {
  render() {
    const { authUser } = this.props;
    return <UserForm user={authUser} />;
  }
}

export default AccountSettings;
