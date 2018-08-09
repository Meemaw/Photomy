import * as React from 'react';
import { Icon, IconProps } from 'semantic-ui-react';

const LoadingIcon = (props: IconProps) => {
  return <Icon loading name="spinner" {...props} />;
};

export default LoadingIcon;
