import React from 'react';
import Navbar from '../nav/Navbar';

const MainContent = ({ location, children }) => {
  return (
    <section className="MainContent">
      <Navbar location={location} />
      {children}
    </section>
  );
};

export default MainContent;
