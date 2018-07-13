import React from 'react';
import { Link } from 'react-router-dom';

const Address = props => {
  return (
    <address>
      E-mail: <a href="mailto:support@photomy.si">suppoty@photomy.si</a>.<br />
      Visit us at:
      <Link to="www.photomy.si"> www.photomy.si</Link>
      <br />
      1000 Ljubljana - Slovenia
    </address>
  );
};

export default Address;
