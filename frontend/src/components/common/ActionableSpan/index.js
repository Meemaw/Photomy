import React from 'react';
import ClickableSpan from '../ClickableSpan';
import LoadingIcon from '../LoadingIcon';

const ActionableSpan = ({ handleClick, actionLoading, content, ...rest }) => {
  if (actionLoading) {
    return <LoadingIcon />;
  }
  return (
    <ClickableSpan onClick={handleClick} {...rest}>
      {content}
    </ClickableSpan>
  );
};

export default ActionableSpan;
