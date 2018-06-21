// @flow
import React from 'react';
import { Button } from 'semantic-ui-react';

type Props = { onClick: Function, loading?: boolean, disabled?: boolean, content?: string };

const SaveButton = ({ loading, disabled, onClick, content, ...rest }: Props) => {
  const actualOnClick = loading || disabled ? null : onClick;
  return (
    <Button
      color="green"
      icon="save"
      type="submit"
      content={content || 'Save changes'}
      {...rest}
      onClick={actualOnClick}
    />
  );
};

export default SaveButton;
