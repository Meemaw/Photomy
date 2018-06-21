// @flow
import React from 'react';
import { Message, Icon } from 'semantic-ui-react';

type Props = { errors: ?Array<string> };

const FormErrors = ({ errors }: Props) => {
  return errors ? (
    <Message negative icon>
      <Icon name="frown" />
      <Message.Content>
        <Message.Header style={{ textAlign: 'left' }}>Something went wrong</Message.Header>

        <Message.List>
          {errors.map((error, ix) => <Message.Item key={ix}>{error}</Message.Item>)}
        </Message.List>
      </Message.Content>
    </Message>
  ) : null;
};

export default FormErrors;
