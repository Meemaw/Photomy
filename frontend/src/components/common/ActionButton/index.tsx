import * as React from 'react';
import { Button, ButtonProps, SemanticCOLORS, SemanticICONS } from 'semantic-ui-react';

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void;
  loading?: boolean;
  disabled?: boolean;
  color?: SemanticCOLORS;
  icon?: SemanticICONS;
  content: string;
};

const ActionButton = ({ loading, disabled, onClick, ...rest }: Props) => {
  const actualOnClick = loading || disabled ? undefined : onClick;
  return (
    <Button type="submit" {...rest} onClick={actualOnClick} loading={loading} disabled={disabled} />
  );
};

export default ActionButton;
