// @flow
import React from 'react';
import ActionButton from '../ActionButton';

type Props = { onClick: Function, loading?: boolean, disabled?: boolean, content?: string };

const DeleteButton = ({ content, ...rest }: Props) => {
  return <ActionButton color="red" icon="trash" content={content || 'Delete'} {...rest} />;
};

export default DeleteButton;
