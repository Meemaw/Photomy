import React from 'react';
import styled from 'styled-components';
import { Grid, Header } from 'semantic-ui-react';

const AuthFormWrapper = props => {
  return (
    <Style {...props}>
      <Grid textAlign="center">
        <Grid.Column>
          {props.header && (
            <Header inverted as="h2">
              {props.header}
            </Header>
          )}
          {props.children}
        </Grid.Column>
      </Grid>
    </Style>
  );
};

const Style = styled.div`
  background-color: #1b1c1d;
  min-height: calc(100vh + 20px);

  .ui.center.aligned.grid {
    height: 100%;
    padding-top: 40px;
  }

  @media only screen and (min-width: 1000px) {
    .ui.center.aligned.grid {
      padding-top: 100px;
    }
  }

  .ui.grid > .column {
    max-width: ${props => (props.width ? props.width : '500px')};
  }

  .ui.form {
    margin-top: 30px;
  }
`;

export default AuthFormWrapper;
