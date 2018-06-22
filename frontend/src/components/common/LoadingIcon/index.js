// @flow
import React from 'react';
import { Icon } from 'semantic-ui-react';

type Props = {};

const LoadingIcon = (props: Props) => {
  return <Icon loading name="spinner" {...props} />;
};

export default LoadingIcon;
