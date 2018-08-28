import * as React from 'react';
import ClickableSpan from '../ClickableSpan';
import LoadingIcon from '../LoadingIcon';

type Props = {
  handleClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
  actionLoading: boolean;
  content: string;
  fontWeight?: number;
};

const ActionableSpan = ({ handleClick, actionLoading, content, fontWeight, ...rest }: Props) => {
  if (actionLoading) {
    return <LoadingIcon />;
  }
  return (
    <ClickableSpan onClick={handleClick} fontWeight={fontWeight} {...rest}>
      {content}
    </ClickableSpan>
  );
};

export default ActionableSpan;
