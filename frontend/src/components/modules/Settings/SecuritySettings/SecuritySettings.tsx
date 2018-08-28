import * as React from 'react';
import { List } from 'semantic-ui-react';

import SettingsTab from '../../../common/SettingsTab';
import PasswordChangeForm from '../../../PasswordChangeForm';

const SecuritySettings = () => (
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

export default SecuritySettings;
