// @flow
import React from 'react';
import ClickableSpan from '../ClickableSpan';
import LoadingIcon from '../LoadingIcon';

type Props = { handleClick: Function, actionLoading: boolean, content: string };

const ActionableSpan = ({ handleClick, actionLoading, content, ...rest }: Props) => {
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
