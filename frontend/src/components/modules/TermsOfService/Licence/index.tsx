import * as React from 'react';
import { Link } from 'react-router-dom';

const Licence = (props: object) => (
  <React.Fragment>
    <h2>License</h2>
    <p>
      Unless otherwise stated, Photomy and/or it’s licensors own the intellectual property rights
      for all material on Photomy. All intellectual property rights are reserved. You may view
      and/or print pages from <Link to="www.photomy.si"> www.photomy.si</Link> for your own personal
      use subject to restrictions set in these terms and conditions.
    </p>
    <p>You must not:</p>
    <ol>
      <li>
        Republish material from <Link to="www.photomy.si"> www.photomy.si</Link>
      </li>
      <li>
        Sell, rent or sub-license material from <Link to="www.photomy.si"> www.photomy.si</Link>
      </li>
      <li>
        Reproduce, duplicate or copy material from <Link to="www.photomy.si"> www.photomy.si</Link>
      </li>
    </ol>
    <p>
      Redistribute content from Photomy (unless content is specifically made for redistribution).
    </p>
  </React.Fragment>
);

export default Licence;
