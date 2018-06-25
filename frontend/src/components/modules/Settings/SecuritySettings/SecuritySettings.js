import React from 'react';
import PasswordChangeForm from '../../../PasswordChangeForm';
import SettingsTab from '../../../common/SettingsTab';
import { List } from 'semantic-ui-react';

class SecuritySettings extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SettingsTab
          renderTitle={() => (
            <React.Fragment>
              <List.Header>Change password</List.Header>
              <List.Description style={{ color: 'grey' }}>
                It's a good idea to use a strong password that you don't use elsewhere
              </List.Description>
            </React.Fragment>
          )}
          icon="key"
          renderContent={() => <PasswordChangeForm />}
        />
      </React.Fragment>
    );
  }
}

export default SecuritySettings;
