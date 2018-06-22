// @flow
import React from 'react';
import { Button } from 'semantic-ui-react';

type Props = { onClick: Function, loading?: boolean, disabled?: boolean, content?: string };

const ActionButton = ({ loading, disabled, onClick, ...rest }: Props) => {
  const actualOnClick = loading || disabled ? null : onClick;
  return (
    <Button type="submit" {...rest} onClick={actualOnClick} loading={loading} disabled={disabled} />
  );
};

export default ActionButton;
