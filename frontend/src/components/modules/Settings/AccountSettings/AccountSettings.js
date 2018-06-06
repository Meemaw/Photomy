// @flow
import React from 'react';
import type { User } from '../../../../meta/types/User';
import UserForm from '../../../UserForm';
import DeleteAccount from '../DeleteAccount';

type Props = { authUser: User };
type State = {};

class AccountSettings extends React.Component<Props, State> {
  render() {
    const { authUser } = this.props;
    return (
      <section className="UserSettings">
        <UserForm user={authUser} />
        <DeleteAccount />
      </section>
    );
  }
}

export default AccountSettings;
