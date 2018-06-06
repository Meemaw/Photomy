// @flow
import * as React from 'react';
import type { User } from '../../../../meta/types/User';
import UserForm from '../../../UserForm';
import SettingsTab from '../../../common/SettingsTab';
import { List } from 'semantic-ui-react';
import withWidth from '../../../../hocs/WithWidth';

type Props = { authUser: User, width: number };
type State = {};

class AccountSettings extends React.Component<Props, State> {
  render() {
    const { authUser, width } = this.props;
    return (
      <section className="UserSettings">
        <SettingsTab
          renderTitle={() => (
            <React.Fragment>
              <List.Header>Base settings</List.Header>
            </React.Fragment>
          )}
          icon="user"
          renderContent={() => <UserForm user={authUser} width={width} />}
        />
      </section>
    );
  }
}

export default withWidth(AccountSettings);
