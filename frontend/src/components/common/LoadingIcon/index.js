import React from 'react';
import { Icon } from 'semantic-ui-react';

const LoadingIcon = props => {
  return <Icon loading name="spinner" {...props} />;
};

export default LoadingIcon;
