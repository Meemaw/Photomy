import React from 'react';
import FormLabel from '../FormLabel';
import { Icon } from 'semantic-ui-react';

const IconFormLabel = ({ label, icon, ...rest }) => {
  return (
    <div {...rest}>
      {icon && <Icon name={icon} />}
      <FormLabel>{label}</FormLabel>
    </div>
  );
};

export default IconFormLabel;
