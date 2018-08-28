import * as React from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';

import { loginPath, registerPath } from '../../../../constants/paths';
import FormErrors from '../../../common/FormErrors';
import { PasswordFormField } from '../../../common/FormInputField';
import Link from '../../../common/Link';
import AuthFormWrapper from '../AuthFormWrapper';
import { Errors, Values } from '../PasswordReset';

type Props = {
  handleChange: any;
  values: Values;
  isSubmitting: boolean;
  handleSubmit: any;
  errors: Errors;
};

const PasswordResetForm = ({
  handleSubmit,
  isSubmitting,
  errors,
  handleChange,
  values: { new_password1, new_password2 },
}: Props) => {
  return (
    <AuthFormWrapper header="Reset password">
      <Form size="large" onSubmit={handleSubmit}>
        <Segment stacked>
          <FormErrors errors={errors.non_field_errors} />
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
          <Button color="blue" fluid size="large" loading={isSubmitting} type="submit">
            Reset password
          </Button>
        </Segment>

        <Segment as={Grid}>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="left">
              <Link to={loginPath}>Remember password?</Link>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Link to={registerPath}>Don't have an account yet?</Link>
            </Grid.Column>
          </Grid.Row>
        </Segment>
      </Form>
    </AuthFormWrapper>
  );
};

export default PasswordResetForm;
