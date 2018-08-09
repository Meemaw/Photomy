import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu, Segment } from 'semantic-ui-react';

import { LANDING_MAIN_BREAKPOINT } from '../../../../constants/breakpoints';
import { rootPath } from '../../../../constants/paths';
import ResponsiveFH from '../../../common/ResponsiveFH';
import AuthMenu from '../AuthMenu';

type Props = { children: React.ReactNode };

const DesktopContainer = ({ children }: Props) => (
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

export default DesktopContainer;
