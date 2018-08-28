import * as React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import styled from 'styled-components';

type Props = {
  header: string;
  children: React.ReactNode;
};

const AuthFormWrapper = (props: Props) => {
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

type StyleProps = {
  width?: number;
  height?: number;
};

const Style = styled.div<StyleProps>`
  background-color: #1b1c1d;
  min-height: 100vh;
  position: fixed;
  -webkit-backface-visibility: hidden;
  overflow: hidden;
  width: 100%;

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
