// @flow
import * as React from 'react';

import { RouteComponentProps } from '../../../../node_modules/@types/react-router';
import { ACCOUNT_TAB, GALLERY_TAB, SECURITY_TAB } from '../../../constants/settings';
import AccountSettings from './AccountSettings';
import GallerySettings from './GallerySettings';
import SecuritySettings from './SecuritySettings';
import Settings from './Settings';

interface Props extends RouteComponentProps<any> {}

const CONTENT_CONTAINER_MAP = {
  [ACCOUNT_TAB]: AccountSettings,
  [SECURITY_TAB]: SecuritySettings,
  [GALLERY_TAB]: GallerySettings,
};
class SettingsContainer extends React.Component<Props, object> {
  renderContent = () => {
    const { search } = this.props.location;
    let ContentContainer = CONTENT_CONTAINER_MAP[search];

    if (!ContentContainer) {
      ContentContainer = AccountSettings;
    }

    return <ContentContainer />;
  };

  render() {
    return <Settings renderContent={this.renderContent} search={this.props.location.search} />;
  }
}

export default SettingsContainer;
