import React from 'react';
import { Button } from 'semantic-ui-react';

const SaveButton = props => {
  const onClick = props.loading || props.disabled ? null : props.onClick;
  return (
    <Button
      {...props}
      onClick={onClick}
      color="green"
      icon="save"
      type="submit"
      content={props.content || 'Save changes'}
    />
  );
};

export default SaveButton;
