import React from 'react';
import HomepageHeading from './Heading';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Divider, Grid, Header, Segment, List, Container, Icon } from 'semantic-ui-react';
import { tosPath } from '../../../lib/paths';

const HomepageLayout = () => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: '100%' }}>
    <HeadingStyle>
      <HomepageHeading />
    </HeadingStyle>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Divider />
            <Header as="h3" style={{ fontSize: '2em' }}>
              Store your photos securely and privately
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Your photos are safely stored in cloud and unacessible to others. You dont have to
              worry about who might see them.
            </p>
            <Divider />
            <Header as="h3" style={{ fontSize: '2em' }}>
              Get photos quickly
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We ensure rapid content delivery of photos, so you can get to them as fast as
              possible.
            </p>
            <Divider />

            <Header as="h3" style={{ fontSize: '2em' }}>
              Browse people
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Our algorithms will find people in images and group them together. You can tag those
              identities and search by them later.
            </p>
            <Divider />
          </Grid.Column>
          <Grid.Column floated="right" width={6} align="center" />
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a" href="mailto:support@photomy.si">
                  <Icon name="mail" /> Contact us
                </List.Item>
                <List.Item as={Link} to={tosPath}>
                  <Icon name="drivers license" /> Terms of Service
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Social Media
              </Header>

              <List link inverted>
                <List.Item as="a" href="https://github.com/Meemaw/Photomy">
                  <Icon name="github" /> Github
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </div>
);

const HeadingStyle = styled.div`
  background-color: #1b1c1d;
  padding-bottom: 75px;
`;

export default HomepageLayout;
