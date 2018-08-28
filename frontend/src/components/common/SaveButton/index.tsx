import * as React from 'react';

import { ButtonProps, SemanticCOLORS } from '../../../../node_modules/semantic-ui-react';
import ActionButton from '../ActionButton';

interface Props extends ButtonProps {
  color?: SemanticCOLORS;
  content?: string;
}

const SaveButton = ({ content, ...rest }: Props) => {
  return <ActionButton color="green" icon="save" content={content || 'Save changes'} {...rest} />;
};

export default SaveButton;
