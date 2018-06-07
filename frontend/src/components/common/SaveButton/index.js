import React from 'react';
import { Button } from 'semantic-ui-react';

const SaveButton = props => {
  const onClick = props.loading || props.disabled ? null : props.onClick;
  return (
    <Button
      color="green"
      icon="save"
      type="submit"
      content={props.content || 'Save changes'}
      {...props}
      onClick={onClick}
    />
  );
};

export default SaveButton;
