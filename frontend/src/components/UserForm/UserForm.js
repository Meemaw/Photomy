// @flow
import React from 'react';
import SaveButton from '../common/SaveButton';
import FormInputField, { EmailFormField } from '../common/FormInputField';
import { Form, Button } from 'semantic-ui-react';
import type { User } from '../../meta/types/User';
import DeleteAccount from '../modules/Settings/DeleteAccount';
import withWidth from '../../hocs/WithWidth';

type Props = {
  handleChange: Function,
  values: User,
  isSubmitting: boolean,
  handleSubmit: Function,
  errors: Object,
  width: number,
};

const UserForm = ({
  handleSubmit,
  isSubmitting,
  errors,
  handleChange,
  width,
  values: { first_name, last_name, email },
}: Props) => {
  return (
    <Form size="small">
      <Form.Group widths="equal">
        <FormInputField
          fluid
          icon="user"
          label="First Name"
          iconPosition="left"
          placeholder="First Name"
          fieldName="first_name"
          handleChange={handleChange}
          value={first_name}
          errors={errors}
        />

        <FormInputField
          fluid
          icon="user"
          label="Last Name"
          iconPosition="left"
          placeholder="Last Name"
          fieldName="last_name"
          handleChange={handleChange}
          value={last_name}
          errors={errors}
        />
      </Form.Group>

      <EmailFormField fluid value={email} errors={errors} readOnly />
      <ProgressiveButtons narrowThreshold={300} width={width}>
        <SaveButton loading={isSubmitting} type="submit" onClick={handleSubmit} />
        <DeleteAccount />
      </ProgressiveButtons>
    </Form>
  );
};

const ProgressiveButtons = ({ width, narrowThreshold, children }) => {
  return width >= narrowThreshold ? (
    <Button.Group>
      {children.map((child, index) => {
        return [child, index !== children.length - 1 && <Button.Or key={index} />];
      })}
    </Button.Group>
  ) : (
    <Button.Group vertical fluid>
      {children}
    </Button.Group>
  );
};

export default UserForm;
