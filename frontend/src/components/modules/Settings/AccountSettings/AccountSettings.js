// @flow
import * as React from 'react';
import type { User } from '../../../../meta/types/User';
import UserForm from '../../../UserForm';
import DeleteAccount from '../DeleteAccount';
import SettingsTab from '../../../common/SettingsTab';
import { List } from 'semantic-ui-react';

type Props = { authUser: User };
type State = {};

class AccountSettings extends React.Component<Props, State> {
  render() {
    const { authUser } = this.props;
    return (
      <section className="UserSettings">
        <SettingsTab
          renderTitle={() => (
            <React.Fragment>
              <List.Header>Base settings</List.Header>
            </React.Fragment>
          )}
          icon="user"
          renderContent={() => <UserForm user={authUser} />}
        />

        <SettingsTab
          renderTitle={() => (
            <React.Fragment>
              <List.Header>Delete Account</List.Header>
            </React.Fragment>
          )}
          icon="trash"
          renderContent={() => <DeleteAccount />}
        />
      </section>
    );
  }
}

export default AccountSettings;
