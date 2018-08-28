import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import { registerPath } from '../../../../constants/paths';

const HomepageHeading = (props: object) => {
  return (
    <Style text textAlign="center">
      <Header as="h1" content="Photomy" inverted />
      <Header as="h2" content="Keep all your photos in one place and organized." inverted />
      <Button primary size="huge" as={Link} to={registerPath}>
        Get Started
        <Icon name="arrow right" />
      </Button>
    </Style>
  );
};

const Style = styled(Container)`
  h1.ui.header {
    font-size: 4em;
    font-weight: normal;
    margin-bottom: 0px;
    margin-top: 2.5em;
  }

  .Particles {
    height: 100%;
    width: 100%;
  }

  h2.ui.header {
    font-size: 1.7em;
    font-weight: normal;
    margin-top: 1.5em;
  }

  @media only screen and (max-width: 1240px) {
    h1.ui.header {
      font-size: 2em;
      margin-top: 1.5em;
    }
  }

  @media only screen and (max-width: 1240px) {
    h2.ui.header {
      font-size: 1.5em;
      margin-top: 0.5em;
    }
  }
`;

export default HomepageHeading;
