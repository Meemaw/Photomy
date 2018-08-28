import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
} from 'semantic-ui-react';
import styled from 'styled-components';

import { Location } from '../../../../../node_modules/@types/history';
import { LANDING_MAIN_BREAKPOINT } from '../../../../constants/breakpoints';
import { loginPath, registerPath, rootPath } from '../../../../constants/paths';

type Props = { children: React.ReactNode; location?: Location };
type State = { sidebarOpened: boolean };

class MobileContainer extends React.PureComponent<Props, State> {
  state = { sidebarOpened: false };

  closeSidebar = () => {
    if (!this.state.sidebarOpened) {
      this.setState({ sidebarOpened: false });
    }
  };

  toggleSidebar = () => this.setState({ sidebarOpened: !this.state.sidebarOpened });

  openSidebar = () => this.setState({ sidebarOpened: true });

  render() {
    const { children, location } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive maxWidth={LANDING_MAIN_BREAKPOINT - 1}>
        <Sidebar.Pushable>
          <StyledSidebar
            as={Menu}
            animation="overlay"
            direction="top"
            inverted
            vertical
            visible={sidebarOpened}
          >
            <Divider />
            <Menu.Item
              as={Link}
              to={rootPath}
              onClick={this.closeSidebar}
              active={window.location.pathname === rootPath}
            >
              Home
            </Menu.Item>

            <AuthMenuItem closeSidebar={this.closeSidebar} location={location} />
          </StyledSidebar>

          <Sidebar.Pusher
            style={{
              height: sidebarOpened ? '100vh' : 'auto',
              minHeight: '100vh',
            }}
          >
            <Segment inverted textAlign="center" vertical>
              <Container>
                <NavbarFixedMenu
                  closeSidebar={this.closeSidebar}
                  toggleSidebar={this.toggleSidebar}
                  sidebarOpened={sidebarOpened}
                />
              </Container>
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

export interface NavbarFixedMenuProps {
  sidebarOpened: boolean;
  toggleSidebar: (e: React.MouseEvent) => void;
  closeSidebar: (e: React.MouseEvent) => void;
}

const NavbarFixedMenu = ({ sidebarOpened, toggleSidebar, closeSidebar }: NavbarFixedMenuProps) => {
  return (
    <Menu inverted pointing secondary size="large">
      <Menu.Item as={Link} to={rootPath} active onClick={closeSidebar}>
        Photomy
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item onClick={toggleSidebar}>
          <Icon size="large" name={sidebarOpened ? 'remove' : 'sidebar'} />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export interface AuthMenuItemProps {
  closeSidebar: (e: React.MouseEvent) => void;
  location?: Location;
}

const AuthMenuItem = ({ closeSidebar, location }: AuthMenuItemProps) => {
  return (
    <Menu.Item>
      <Button.Group fluid inverted>
        <Button
          content="Sign in"
          basic
          inverted
          as={Link}
          to={loginPath}
          onClick={closeSidebar}
          active={location ? location.pathname === loginPath : false}
        />
        <Button.Or />
        <Button
          content="Sign up"
          basic
          inverted
          as={Link}
          to={registerPath}
          onClick={closeSidebar}
          active={location ? location.pathname === registerPath : false}
        />
      </Button.Group>
    </Menu.Item>
  );
};

const StyledSidebar = styled(Sidebar)`
  &&& {
    min-height: calc(100vh - 80px) !important;
    top: 80px !important;
    overflow-y: hidden !important;
  }

  .ui.divider {
    margin-bottom: 0px;
  }
`;

export default MobileContainer;
