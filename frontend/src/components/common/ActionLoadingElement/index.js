import React from 'react';
import LoadingIcon from '../LoadingIcon';

const ActionLoadingElement = ({ loading, children, ...rest }) => {
  if (loading) {
    return <LoadingIcon />;
  }

  return children;
};

export default ActionLoadingElement;
