import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';

import { loginPath, registerPath } from '../../../../constants/paths';

const AuthMenu = (props: object) => (
  <Menu.Item position="right">
    <Button inverted as={Link} to={loginPath} active={window.location.pathname === loginPath}>
      Log in
    </Button>
    <Button
      inverted
      style={{ marginLeft: '0.5em' }}
      as={Link}
      to={registerPath}
      active={window.location.pathname === registerPath}
    >
      Sign Up
    </Button>
  </Menu.Item>
);

export default AuthMenu;
