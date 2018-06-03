// @flow
import React from 'react';
import { PasswordFormField } from '../common/FormInputField';
import SaveButton from '../common/SaveButton';
import { Form } from 'semantic-ui-react';

type Props = {
  handleChange: Function,
  values: Object,
  isSubmitting: boolean,
  handleSubmit: Function,
  errors: Object,
};

const PasswordChangeForm = ({
  handleSubmit,
  isSubmitting,
  errors,
  handleChange,
  values: { old_password, new_password1, new_password2 },
}: Props) => {
  return (
    <Form size="small" style={{ width: '400px' }}>
      <PasswordFormField
        label="Current password"
        placeholder="Current password"
        fieldName="old_password"
        value={old_password}
        handleChange={handleChange}
        errors={errors}
      />
      <PasswordFormField
        label="New password"
        placeholder="New password"
        fieldName="new_password1"
        value={new_password1}
        handleChange={handleChange}
        errors={errors}
      />
      <PasswordFormField
        label="Retype new"
        placeholder="Retype new"
        fieldName="new_password2"
        value={new_password2}
        handleChange={handleChange}
        errors={errors}
      />
      <SaveButton
        content="Save chagnes"
        loading={isSubmitting}
        onClick={handleSubmit}
        disabled={old_password.length === 0}
      />
    </Form>
  );
};

export default PasswordChangeForm;
