// @flow
import React from 'react';
import SaveButton from '../common/SaveButton';
import FormInputField, { EmailFormField } from '../common/FormInputField';
import { Form } from 'semantic-ui-react';
import type { User } from '../../meta/types/User';

type Props = {
  handleChange: Function,
  values: User,
  isSubmitting: boolean,
  handleSubmit: Function,
  errors: Object,
};

const UserForm = ({
  handleSubmit,
  isSubmitting,
  errors,
  handleChange,
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

      <SaveButton loading={isSubmitting} type="submit" onClick={handleSubmit} />
    </Form>
  );
};

export default UserForm;
