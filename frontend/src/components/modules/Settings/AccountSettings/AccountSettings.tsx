import * as React from 'react';
import { List } from 'semantic-ui-react';

import { User } from '../../../../meta/types/User';
import AvatarUpload from '../../../AvatarUpload';
import SettingsTab from '../../../common/SettingsTab';
import UserForm from '../../../UserForm';

type Props = { authUser?: User; width: number };

const AccountSettings = ({ authUser, width }: Props) => {
  return (
    <section className="UserSettings">
      <SettingsTab
        className="BaseSettings"
        editId="Base-Settings-Edit"
        renderTitle={() => (
          <React.Fragment>
            <List.Header>Base settings</List.Header>
          </React.Fragment>
        )}
        icon="user"
        renderContent={() => <BaseSettingsContent authUser={authUser} width={width} />}
      />

      <SettingsTab
        className="AvatarSettings"
        renderTitle={() => (
          <React.Fragment>
            <List.Header>Avatar</List.Header>
          </React.Fragment>
        )}
        icon="image"
        renderContent={() => <AvatarSettingsContent authUser={authUser!} />}
      />
    </section>
  );
};

const AvatarSettingsContent = ({ authUser }: { authUser?: User }) => {
  return (
    <section className="AvatarSettings">
      <AvatarUpload authUser={authUser!} />
    </section>
  );
};

const BaseSettingsContent = ({ authUser, width }: Props) => {
  return (
    <section className="BaseSettings">
      <UserForm user={authUser!} width={width} />
    </section>
  );
};

export default AccountSettings;
