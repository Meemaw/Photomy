// @flow
import * as React from 'react';
import Settings from './Settings';
import AccountSettings from './AccountSettings';
import SecuritySettings from './SecuritySettings';
import { SECURITY_TAB, ACCOUNT_TAB } from '../../../constants/settings';

type Props = { location: Object };
type State = {};

const CONTENT_CONTAINER_MAP = new Map([
  [ACCOUNT_TAB, AccountSettings],
  [SECURITY_TAB, SecuritySettings],
]);

class SettingsContainer extends React.Component<Props, State> {
  renderContent = () => {
    const { search } = this.props.location;
    let ContentContainer = CONTENT_CONTAINER_MAP.get(search);

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
