// @flow
import React from 'react';
import { Button } from 'semantic-ui-react';

type Props = { onClick: Function, loading?: boolean, disabled?: boolean, content?: string };

const DeleteButton = ({ loading, disabled, onClick, content, ...rest }: Props) => {
  const actualOnClick = loading || disabled ? null : onClick;
  return (
    <Button
      {...rest}
      onClick={actualOnClick}
      color="red"
      icon="trash"
      type="submit"
      content={content || 'Delete'}
    />
  );
};

export default DeleteButton;
