import React from 'react';
import { Button } from 'semantic-ui-react';

const DeleteButton = props => {
  const onClick = props.loading || props.disabled ? null : props.onClick;
  return (
    <Button
      {...props}
      onClick={onClick}
      color="red"
      icon="trash"
      type="submit"
      content={props.content || 'Delete'}
    />
  );
};

export default DeleteButton;
