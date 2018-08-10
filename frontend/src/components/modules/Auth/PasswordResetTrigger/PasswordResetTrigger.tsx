import * as React from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';

import { loginPath, registerPath } from '../../../../constants/paths';
import FormErrors from '../../../common/FormErrors';
import { EmailFormField } from '../../../common/FormInputField';
import Link from '../../../common/Link';
import AuthFormWrapper from '../AuthFormWrapper';
import { Values } from '../PasswordResetTrigger';

type Props = {
  handleSubmit: any;
  isSubmitting: boolean;
  values: Values;
  errors: any;
  handleChange: any;
};

const PasswordResetTrigger = ({
  handleSubmit,
  isSubmitting,
  values: { email },
  errors,
  handleChange,
}: Props) => {
  return (
    <AuthFormWrapper header=" Forgot your password?">
      <Form size="large" onSubmit={handleSubmit}>
        <Segment stacked>
          <FormErrors errors={errors.non_field_errors} />

          <EmailFormField
            handleChange={handleChange}
            errors={errors}
            value={email}
            fieldName="email"
          />

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
