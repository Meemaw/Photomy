// @flow
import React from 'react';
import PropTypes from 'prop-types';
import AuthMenu from '../AuthMenu';
import ResponsiveFH from '../../../common/ResponsiveFH';
import { Menu, Segment, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { rootPath } from '../../../../lib/paths';
import { LANDING_MAIN_BREAKPOINT } from '../../../../constants/breakpoints';

type Props = { children: any };

const DesktopContainer = ({ children }: Props) => {
  return (
    <ResponsiveFH minWidth={LANDING_MAIN_BREAKPOINT}>
      <Segment textAlign="center" vertical inverted style={{ height: '80px' }}>
        <Menu secondary={true} pointing={true} inverted>
          <Container>
            <Menu.Item as={Link} to={rootPath} active>
              Photomy
            </Menu.Item>
            <AuthMenu />
          </Container>
        </Menu>
      </Segment>
      {children}
    </ResponsiveFH>
  );
};

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

export default DesktopContainer;
