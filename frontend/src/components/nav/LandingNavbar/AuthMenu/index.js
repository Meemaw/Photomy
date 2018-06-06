import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { loginPath, registerPath } from '../../../../lib/paths';

const AuthMenu = props => {
  const { pathname } = window.location;
  return (
    <Menu.Item position="right">
      <Button inverted as={Link} to={loginPath} active={pathname === loginPath}>
        Log in
      </Button>
      <Button
        inverted
        style={{ marginLeft: '0.5em' }}
        as={Link}
        to={registerPath}
        active={pathname === registerPath}
      >
        Sign Up
      </Button>
    </Menu.Item>
  );
};

export default AuthMenu;
