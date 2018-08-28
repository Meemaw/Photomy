import * as React from 'react';

import { RouteComponentProps } from '../../../node_modules/@types/react-router';
import Navbar from '../nav/Navbar';

interface Props extends RouteComponentProps<any> {
  children: any;
}

const MainContent: React.StatelessComponent<any> = ({ children, ...rest }: Props) => {
  return (
    <section className="MainContent">
      <Navbar {...rest} />
      {children}
    </section>
  );
};

MainContent.defaultProps = {
  history: undefined,
};

export default MainContent;
