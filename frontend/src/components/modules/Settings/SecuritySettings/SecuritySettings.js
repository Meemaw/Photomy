import React from 'react';
import { List, Divider, Button } from 'semantic-ui-react';
import PasswordChangeForm from '../../../PasswordChangeForm';

class SecuritySettings extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Divider style={{ marginTop: '0px', paddingTop: '0px' }} />
        <List divided relaxed>
          <List.Item>
            <List.Content floated="right">
              <Button>Edit</Button>
            </List.Content>
            <List.Icon name="key" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>Change password</List.Header>
              <List.Description style={{ color: 'grey' }}>
                It's a good idea to use a strong password that you don't use elsewhere
              </List.Description>
            </List.Content>
          </List.Item>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
            <PasswordChangeForm />
          </div>
        </List>
      </React.Fragment>
    );
  }
}

export default SecuritySettings;
