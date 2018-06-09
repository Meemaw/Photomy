import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  Menu,
  Segment,
  Container,
  Icon,
  Button,
  Divider,
  Responsive,
} from 'semantic-ui-react';
import { rootPath, loginPath, registerPath } from '../../../../lib/paths';

const LANDING_MAIN_BREAKPOINT = 1000;

class MobileContainer extends React.PureComponent {
  state = {};

  closeSidebar = () => {
    this.state.sidebarOpened && this.setState({ sidebarOpened: false });
  };

  toggleSidebar = () => {
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  openSidebar = () => {
    this.setState({ sidebarOpened: true });
  };

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
            <Menu.Item as={Link} to={rootPath} onClick={this.closeSidebar}>
              TODO 2
            </Menu.Item>

            <Menu.Item as={Link} to={rootPath} onClick={this.closeSidebar}>
              TODO 2
            </Menu.Item>
            <AuthMenuItem closeSidebar={this.closeSidebar} location={location} />
          </StyledSidebar>

          <Sidebar.Pusher style={{ height: sidebarOpened ? '100vh' : 'auto', minHeight: '100vh' }}>
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

const NavbarFixedMenu = ({ sidebarOpened, toggleSidebar, closeSidebar }) => {
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

const AuthMenuItem = ({ closeSidebar, location }) => {
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
          active={location.pathname === loginPath}
        />
        <Button.Or />
        <Button
          content="Sign up"
          basic
          inverted
          as={Link}
          to={registerPath}
          onClick={closeSidebar}
          active={location.pathname === registerPath}
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

MobileContainer.propTypes = {
  children: PropTypes.node,
};

export default MobileContainer;
