import * as React from 'react';
import { Button, Checkbox, Form, Grid, Segment } from 'semantic-ui-react';

import { Values } from '.';
import { loginPath, tosPath } from '../../../../constants/paths';
import FormErrors from '../../../common/FormErrors';
import FormInputField, { EmailFormField, PasswordFormField } from '../../../common/FormInputField';
import FormLabel from '../../../common/FormLabel';
import Link from '../../../common/Link';
import AuthFormWrapper from '../AuthFormWrapper';

type Props = {
  handleSubmit: any;
  isSubmitting: boolean;
  errors: any;
  values: Values;
  setFieldValue: any;
  handleChange: any;
};

const Register = ({
  handleSubmit,
  isSubmitting,
  values: { email, password1, firstName, lastName, toc },
  errors,
  handleChange,
  setFieldValue,
}: Props) => (
  <AuthFormWrapper header="Create your Account">
    <Form size="large" onSubmit={handleSubmit}>
      <Segment stacked>
        <FormErrors errors={errors.__non_field_errors__} />
        <Form.Group widths="equal">
          <FormInputField
            value={firstName}
            errors={errors}
            fluid
            icon="user"
            iconPosition="left"
            autoComplete="given-name"
            placeholder="First Name"
            fieldName="firstName"
            handleChange={handleChange}
          />
          <FormInputField
            value={lastName}
            errors={errors}
            fluid
            autoComplete="family-name"
            icon="user"
            iconPosition="left"
            placeholder="Last Name"
            fieldName="lastName"
            handleChange={handleChange}
          />
        </Form.Group>
        <EmailFormField handleChange={handleChange} value={email} errors={errors} />
        <PasswordFormField
          value={password1}
          errors={errors}
          handleChange={handleChange}
          fieldName="password1"
        />

        <Form.Field>
          <Checkbox
            onChange={(e, { checked }) => {
              setFieldValue('toc', checked);
            }}
            checked={toc}
          />

          <FormLabel>
            I agree to the <Link to={tosPath}>Terms of Service and Privacy Policy.</Link>
          </FormLabel>
        </Form.Field>

        <Button
          color="blue"
          fluid
          size="large"
          loading={isSubmitting}
          type="submit"
          id="Register-Button"
        >
          Create Account
        </Button>
      </Segment>

      <Segment as={Grid}>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <Link to={loginPath}>Already have an accont?</Link>
          </Grid.Column>
        </Grid.Row>
      </Segment>
    </Form>
  </AuthFormWrapper>
);

export default Register;
