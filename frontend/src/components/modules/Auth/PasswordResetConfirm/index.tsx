import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Message, Segment } from 'semantic-ui-react';

import { Location } from '../../../../../node_modules/@types/history';
import { loginPath } from '../../../../constants/paths';
import Link from '../../../common/Link';
import AuthFormWrapper from '../AuthFormWrapper';

type Props = {
  location: Location;
};

const PasswordResetConfirm = ({ location }: Props) => {
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
