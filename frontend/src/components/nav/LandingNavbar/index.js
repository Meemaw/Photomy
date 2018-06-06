import React from 'react';
import DesktopContainer from './Desktop';
import MobileContainer from './Mobile';

const Navbar = props => {
  return (
    <div style={{ height: '100vh' }}>
      <DesktopContainer {...props}>{props.children}</DesktopContainer>
      <MobileContainer {...props}>{props.children}</MobileContainer>
    </div>
  );
};

export default Navbar;
