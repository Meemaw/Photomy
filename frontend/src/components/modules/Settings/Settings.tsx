import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Divider, Header, Menu, Segment } from 'semantic-ui-react';

import {
  GALLERY_SETTINGS_MENU_ITEMS,
  GENERAL_SETTINGS_MENU_ITEMS,
  MENU_UI_NAME_ICON_MAP,
  MENU_UI_NAME_MAP,
} from '../../../constants/settings';
import ContentContainer from '../../common/ContentContainer';

type Props = { renderContent: any; search: string };
type State = { activeItem: string };

class Settings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const allItems = [...GALLERY_SETTINGS_MENU_ITEMS, ...GENERAL_SETTINGS_MENU_ITEMS];
    let menuItem = allItems.find(mi => mi.to.search === props.search);
    if (!menuItem) {
      menuItem = GENERAL_SETTINGS_MENU_ITEMS[0];
    }
    this.state = {
      activeItem: menuItem.name,
    };
  }

  handleMenuTabClick = (e: any, { name }: any) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    const { renderContent } = this.props;
    const menuContent = MENU_UI_NAME_MAP.get(activeItem);
    const menuIcon = MENU_UI_NAME_ICON_MAP.get(activeItem);
    return (
      <ContentContainer className="Settings">
        <Divider style={{ marginTop: '0px', paddingTop: '0px' }} />
        <Container style={{ display: 'flex' }}>
          <Menu pointing secondary vertical style={{ height: '100%' }} className="SettingsSideMenu">
            <Menu.Item style={{ marginRight: '-7px' }}>
              <Menu.Header>General</Menu.Header>

              <Menu.Menu>
                {GENERAL_SETTINGS_MENU_ITEMS.map(menuItem => {
                  return (
                    <Menu.Item
                      {...menuItem}
                      key={menuItem.name}
                      as={Link}
                      onClick={this.handleMenuTabClick}
                      active={activeItem === menuItem.name}
                    />
                  );
                })}
              </Menu.Menu>
            </Menu.Item>

            <Menu.Item style={{ marginRight: '-7px' }}>
              <Menu.Header>Gallery</Menu.Header>
              <Menu.Menu>
                {GALLERY_SETTINGS_MENU_ITEMS.map(menuItem => {
                  return (
                    <Menu.Item
                      {...menuItem}
                      key={menuItem.name}
                      as={Link}
                      onClick={this.handleMenuTabClick}
                      active={activeItem === menuItem.name}
                    />
                  );
                })}
              </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
              <Menu.Header>Privacy</Menu.Header>
            </Menu.Item>

            <Menu.Item>
              <Menu.Header>Support</Menu.Header>
            </Menu.Item>
          </Menu>
          <Segment
            style={{
              width: '100%',
              marginLeft: '30px',
              marginTop: '0px',
              height: '100%',
            }}
            className="SettingsContent"
          >
            <Header as="h3" content={menuContent} icon={menuIcon} />
            {renderContent()}
          </Segment>
        </Container>
      </ContentContainer>
    );
  }
}

export default Settings;
