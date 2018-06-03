import React from 'react';
import AuthFormWrapper from '../AuthFormWrapper';
import Link from '../../../common/Link';
import { loginPath } from '../../../../lib/paths';
import { Grid, Segment, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

const PasswordResetConfirm = ({ location }) => {
  const requestedReset = location.state && location.state.requestedReset;

  if (!requestedReset) {
    return <Redirect to={loginPath} />;
  }

  return (
    <AuthFormWrapper header="Password reset e-mail sent">
      <Message
        icon="mail"
        content="E-mail with instructions for password reset has been sent to your email"
      />

      <Segment as={Grid}>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <Link to={loginPath}>Login</Link>
          </Grid.Column>
        </Grid.Row>
      </Segment>
    </AuthFormWrapper>
  );
};

export default PasswordResetConfirm;
