import React from 'react';
import AuthFormWrapper from '../AuthFormWrapper';
import Link from '../../../common/Link';
import FormErrors from '../../../common/FormErrors';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { EmailFormField } from '../../../common/FormInputField';
import { loginPath, registerPath } from '../../../../lib/paths';

const PasswordResetTrigger = ({
  handleSubmit,
  isSubmitting,
  values: { email },
  errors,
  handleChange,
  handleBlur,
}) => {
  return (
    <AuthFormWrapper header=" Forgot your password?">
      <Form size="large" onSubmit={handleSubmit}>
        <Segment stacked>
          <FormErrors errors={errors.non_field_errors} />

          <EmailFormField handleChange={handleChange} errors={errors} value={email} />

          <Button color="blue" fluid size="large" loading={isSubmitting} type="submit">
            Reset Password
          </Button>
        </Segment>
      </Form>
      <Segment as={Grid}>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="left">
            <Link to={loginPath}>Already have an account?</Link>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Link to={registerPath}>Don't have an account yet?</Link>
          </Grid.Column>
        </Grid.Row>
      </Segment>
    </AuthFormWrapper>
  );
};

export default PasswordResetTrigger;
