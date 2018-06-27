// @flow
import * as React from 'react';
import UserForm from '../../../UserForm';
import SettingsTab from '../../../common/SettingsTab';
import withWidth from '../../../../hocs/WithWidth';
import AvatarUpload from '../../../AvatarUpload';
import { List } from 'semantic-ui-react';
import type { User } from '../../../../meta/types/User';

type Props = { authUser: User, width: number };

const GallerySettings = ({ authUser, width }: Props) => {
  return <section className="UserSettings">TODO</section>;
};

export default GallerySettings;
