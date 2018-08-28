import * as React from 'react';
import { Icon, SemanticICONS } from 'semantic-ui-react';
import FormLabel from '../FormLabel';

interface Props extends React.HTMLAttributes<any> {
  label: string;
  icon: SemanticICONS;
}

const IconFormLabel = ({ label, icon, ...rest }: Props) => {
  return (
    <div {...rest}>
      {icon && <Icon name={icon} />}
      <FormLabel>{label}</FormLabel>
    </div>
  );
};

export default IconFormLabel;
