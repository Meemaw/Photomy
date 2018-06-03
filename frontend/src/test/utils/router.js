import React from 'react';
import { MemoryRouter } from 'react-router-dom';

const withRouter = (WrappedComponent, Router = MemoryRouter) => {
  return <Router>{WrappedComponent}</Router>;
};

export default withRouter;
