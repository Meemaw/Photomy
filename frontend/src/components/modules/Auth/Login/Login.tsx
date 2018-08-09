import * as React from 'react';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';

import { Location } from '../../../../../node_modules/@types/history';
import { passwordResetPath, registerPath } from '../../../../constants/paths';
import FormErrors from '../../../common/FormErrors';
import FormInputField from '../../../common/FormInputField';
import Link from '../../../common/Link';
import AuthFormWrapper from '../AuthFormWrapper';
import { Errors, Values } from '../Login';

type Props = {
  handleSubmit: any;
  isSubmitting: boolean;
  values: Values;
  errors: Errors;
  handleChange: any;
  location: Location;
};

const Login = ({
  handleSubmit,
  isSubmitting,
  values: { email, password },
  errors,
  handleChange,
  location,
}: Props) => {
  const { search, state } = location;
  const passwordReset = Object.keys(errors).length === 0 && state && state.passwordReset;
  const registerRedirect = Object.keys(errors).length === 0 && state && state.register;
  return (
    <AuthFormWrapper header="Sign in to Photomy">
      <Form size="large" onSubmit={handleSubmit}>
        <Segment stacked>
          <FormErrors errors={errors.non_field_errors} />

          {search.includes('?passwordReset&token=') && (
            <Message size="small" content="Password successfuly changed!" positive />
          )}
          <FormInputField
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
            type="email"
            fieldName="email"
            autoComplete="email"
            handleChange={handleChange}
            values={email}
            errors={errors}
          />
          <FormInputField
            value={password}
            errors={errors}
            fluid
            autoComplete="current-password"
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            fieldName="password"
            type="password"
            handleChange={handleChange}
          />

          {passwordReset && <Message positive content="Password successfuly channged" />}
          {registerRedirect && (
            <Message
              positive
              content="E-mail with verification instructions has been sent to you"
            />
          )}
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width="10" textAlign="left" verticalAlign="middle">
                <Form.Checkbox label="Keep me signed in on this computer" />
              </Grid.Column>
              <Grid.Column width="6">
                <Button color="blue" fluid size="large" loading={isSubmitting} type="submit">
                  Sign in
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment as={Grid}>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="left">
              <Link to={passwordResetPath}>Forgot password?</Link>
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

export default Login;
