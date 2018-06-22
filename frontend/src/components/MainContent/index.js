// @flow
import React from 'react';
import Navbar from '../nav/Navbar';

type Props = { location?: Object, children: any };

const MainContent = ({ location, children }: Props) => {
  return (
    <section className="MainContent">
      <Navbar location={location} />
      {children}
    </section>
  );
};

export default MainContent;
