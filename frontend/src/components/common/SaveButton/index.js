// @flow
import React from 'react';
import ActionButton from '../ActionButton';

type Props = { onClick: Function, loading?: boolean, disabled?: boolean, content?: string };

const SaveButton = ({  content, ...rest }: Props) => {
  return <ActionButton color="green" icon="save" content={content || 'Save changes'} {...rest} />;
};

export default SaveButton;
