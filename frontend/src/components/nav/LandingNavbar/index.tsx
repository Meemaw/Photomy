import * as React from 'react';

import { Location } from '../../../../node_modules/@types/history';
import { rootPath, tosPath } from '../../../constants/paths';
import DesktopContainer from './Desktop';
import MobileContainer from './Mobile';

type Props = { children: any; location?: Location };

class Navbar extends React.Component<Props, object> {
  toggleOverflow() {
    if (window.location.pathname === rootPath || window.location.pathname === tosPath) {
      document.body.classList.remove('Oveflow-Hidden');
    } else {
      document.body.classList.add('Oveflow-Hidden');
    }
  }
  componentDidMount() {
    this.toggleOverflow();
  }

  componentWillUpdate() {
    this.toggleOverflow();
  }

  componentWillUnmount() {
    document.body.classList.add('Oveflow-Hidden');
  }

  render() {
    const props = this.props;
    return (
      <div style={{ height: '100vh' }}>
        <DesktopContainer {...props}>{props.children}</DesktopContainer>
        <MobileContainer {...props}>{props.children}</MobileContainer>
      </div>
    );
  }
}

export default Navbar;
